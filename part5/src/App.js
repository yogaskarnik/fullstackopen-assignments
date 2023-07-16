import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.stringify(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      if (user) {
      } else {
        setErrorMessage('Username or password wrong')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSucessMessage('Login successful')
      setTimeout(() => {
        setSucessMessage()
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      if (!title || !author || !url) {
        setErrorMessage('field cannot be empty')
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        return
      }
      const newBlog = {
        title,
        author,
        url,
      }
      const blogCreated = await blogService.create(newBlog)
      setBlogs(blogs.concat(blogCreated))
      setSucessMessage(
        `a new blog ${blogCreated.title} by ${blogCreated.author}`
      )
      setTimeout(() => {
        setSucessMessage(null)
      }, 5000)
      setFormVisible(false)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  const blogForm = () => {
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>create note</button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new</h2>
          <form onSubmit={handleCreateBlog}>
            <div>
              title
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setErrorMessage('Logged out successfully')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setUser(null)
  }
  return (
    <div>
      <Notification
        message={errorMessage || sucessMessage}
        type={errorMessage ? 'error' : 'success'}
      />
      <div></div>
      {user === null && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App
