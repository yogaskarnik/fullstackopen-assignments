const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (exception) {
    response.status(400).json(exception);
  }
});

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    response.status(400).json(exception);
  }
});

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const userId = request.userId;
  const user = await User.findById(userId);
  try {
    const newBlog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: userId,
    });

    const savedBlog = await newBlog.save();
    user.blog = user.blog.concat(newBlog._id);
    await user.save();

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
      id: user.id,
      name: user.name,
      username: user.username,
    });

    response.status(201).json(populatedBlog);
  } catch (exception) {
    response.status(400).json(exception);
  }
});

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const userId = request.userId;
    try {
      const blog = await Blog.findById(request.params.id);

      if (!blog) {
        return response.status(404).json({ error: 'blog not found' });
      }

      if (blog.user.toString() !== userId) {
        return response.status(401).json({ error: 'invalid user' });
      }

      const del = await Blog.deleteOne({ _id: request.params.id });
      if (del.deletedCount > 0) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: 'blog not found' });
      }
    } catch (exception) {
      response.status(400).json(exception);
    }
  }
);

blogRouter.put('/:id', async (request, response) => {
  const userId = request.userId;
  const user = await User.findById(userId);
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  };

  const updatedBloglist = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  );
  response.status(200).json(updatedBloglist);
});

module.exports = blogRouter;
