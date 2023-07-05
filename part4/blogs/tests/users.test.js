const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'dummy', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'batman',
      name: 'Bruce Wayne',
      password: 'wayner',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dummy',
      name: 'dummy user',
      password: 'sekret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('both username and pwd must be given', async () => {
    let usersAtStart = await helper.usersInDb()
    const userWithoutUsername = {
      username: '',
      name: 'Dummy user',
      password: 'sekret',
    }
    let result = await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password is missing')
    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)

    usersAtStart = await helper.usersInDb()
    const userWithoutPwd = {
      username: 'dummy',
      name: 'Dummy user',
      password: '',
    }
    result = await api
      .post('/api/users')
      .send(userWithoutPwd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password is missing')
    usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('username and pwd must be atleast 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()
    const incompleteUser = {
      username: 'd',
      name: 'Dummy user',
      password: '1',
    }
    const result = await api
      .post('/api/users')
      .send(incompleteUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'username or password cannot be less than 3 characters'
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})
