import { useState } from 'react'

const Blog = ({ blog, handleUpdateLikes, handleDeleteBlog, sessionUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => handleUpdateLikes(blog.id)}>like</button>
        <br />
        {blog.user?.name}
        <br />
        {blog.user.username === sessionUser.username ? (
          <button onClick={() => handleDeleteBlog(blog.id)}>delete</button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
