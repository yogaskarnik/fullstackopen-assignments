const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blog list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map((resp) => resp.title)

  expect(title).toContain('React patterns')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'test author',
    url: 'http://www.test.com/abc.html',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAdded = await helper.blogsInDb()
  const response = await api.get('/api/blogs')
  const contents = blogAdded.map((resp) => resp.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  expect(contents).toContain('async/await simplifies making async calls')
})

test('a test without content should not be added', async () => {
  const newBlog = {
    likes: 1,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogAdded = await helper.blogsInDb()
  expect(blogAdded).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const firstBlog = await helper.blogsInDb()

  const blogToView = firstBlog[0]

  const result = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(result.body).toEqual(blogToView)
})

test('a blog entry can be deleted', async () => {
  const firstBlog = await helper.blogsInDb()
  const blogToDelete = firstBlog[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length - 1)

  const content = blogs.map((resp) => resp.title)
  expect(content).not.toContain(blogToDelete.title)
})

test('verify the unique identifier is named id', async () => {
  const blogsInDB = await helper.blogsInDb()

  const blog = blogsInDB[0]

  expect(blog.id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})
