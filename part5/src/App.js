import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)
  const [user, setUser] = useState(null)

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
  const handleLogin = async (performLogin) => {
    try {
      const user = await loginService.login(performLogin)
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
  const handleCreateBlog = async (newBlog) => {
    try {
      const blogCreated = await blogService.create(newBlog)
      setBlogs(blogs.concat(blogCreated))
      setSucessMessage(
        `a new blog ${blogCreated.title} by ${blogCreated.author}`
      )
      setTimeout(() => {
        setSucessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      {user === null && <h2>log in to application</h2>}
      {user === null && (
        <Togglable buttonLabel="login">
          <LoginForm performLogin={handleLogin} />
        </Togglable>
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      {user !== null && (
        <Togglable buttonLabel="create new blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
      )}
      {user !== null && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
