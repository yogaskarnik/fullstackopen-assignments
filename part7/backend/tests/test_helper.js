const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Dummy title',
    author: 'Dummy author',
    url: 'Dummy URL',
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const user = await User.find({})
  return user.map((user) => user.toJSON())
}

const generateToken = async () => {
  const user = await User.findOne({ username: 'dummy' })

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  return jwt.sign(userForToken, process.env.SECRET)
}

const createNewUser = async () => {
  const user = new User({
    username: 'dummy',
    name: 'dummy',
    password: await bcrypt.hash('sekret', 10),
    blogs: '',
  })
  return await user.save()
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  generateToken,
  createNewUser,
}
