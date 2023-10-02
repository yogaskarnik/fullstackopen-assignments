const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    response.json(users);
  } catch (exception) {
    response.status(400).json(exception);
  }
});

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate('blogs', {
      title: 1,
      author: 1,
    });
    console.log('usersRouter ', user);

    return user ? response.json(user) : response.status(404).end();
  } catch (exception) {
    response.status(400).json(exception);
  }
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password, blog } = request.body;
  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'username or password is missing' });
  }
  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'username or password cannot be less than 3 characters' });
  }
  const userInDB = await User.find({ username: username });

  if (userInDB.length > 0) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    blog: blog,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
