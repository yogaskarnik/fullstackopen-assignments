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

describe('Verify existing blogs in the DB', () => {
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
})
describe('blogs can be added', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Best author',
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
})

describe('blogs can be viewed', () => {
  test('a specific blog can be viewed', async () => {
    const firstBlog = await helper.blogsInDb()

    const blogToView = firstBlog[0]

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual(blogToView)
  })
})

describe('blogs can be deleted', () => {
  test('a blog entry can be deleted', async () => {
    const firstBlog = await helper.blogsInDb()
    const blogToDelete = firstBlog[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length - 1)

    const content = blogs.map((resp) => resp.title)
    expect(content).not.toContain(blogToDelete.title)
  })
})

test('verify name of property id', async () => {
  const blogsInDB = await helper.blogsInDb()

  const blog = blogsInDB[0]

  expect(blog.id).toBeDefined()
})

describe('validate properties', () => {
  test('verify likes property defaults to zero', async () => {
    const newBlog = {
      title: 'What happens when the likes property is set to zero',
      author: 'Amazing author',
      url: 'http://www.test.com/abc.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    const blogCreated = blogs.find(
      (blog) =>
        blog.title === 'What happens when the likes property is set to zero'
    )

    expect(blogCreated.likes).toBe(0)
  })

  test('verify when the title property is empty returns 400', async () => {
    const newBlog = {
      url: 'http://titleisempty.com',
      author: 'Best author',
      likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('verify when the url property is empty returns 400', async () => {
    const newBlog = {
      title: 'Validating request when url is empty',
      author: 'Best author',
      likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('blog can be updated', () => {
  test('update likes property of a blog with specific id', async () => {
    const blogsInDB = await helper.blogsInDb()
    const blogToBeUpdated = blogsInDB[0]
    const updateBlog = { ...blogToBeUpdated, likes: 299 }

    await api
      .put(`/api/blogs/${updateBlog.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = await helper.blogsInDb()
    const updateBlogsInDb = updatedBlog.find(
      (blog) => blog.id === updateBlog.id
    )

    expect(updateBlogsInDb.likes).toBe(299)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
