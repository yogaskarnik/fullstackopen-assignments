const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(blogs)
  } catch (exception) {
    response.status(400).json(exception)
  }
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    response.status(400).json(exception)
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const userId = request.userId
  try {
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: userId,
    })

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    response.status(400).json(exception)
  }
})

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const userId = request.userId
    try {
      const blog = await Blog.findById(request.params.id)
      if (blog.user.toString() !== userId) {
        response.status(401).json({ error: 'invalid user' })
      }
      const del = await Blog.deleteOne()
      if (del.acknowledged) {
        response.status(204).end()
      }
    } catch (exception) {
      next(exception)
    }
  }
)

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: blog.user.id,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBloglist) => {
      response.json(updatedBloglist)
    })
    .catch((error) => next(error))
})

module.exports = blogRouter
