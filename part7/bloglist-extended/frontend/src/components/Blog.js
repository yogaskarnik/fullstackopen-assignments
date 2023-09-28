import { useDispatch, useSelector } from 'react-redux';
import {
  updateLikes,
  removeBlog,
  toggleBlogVisibility,
} from '../reducers/bloglistReducer';
import { logoutUser } from '../reducers/userReducer';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { showNotification } from '../reducers/notificationReducer';

const Blog = ({ sessionUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const blogs = useSelector((state) => state.bloglist);
  const visibility = useSelector((state) => {
    const visibilityObj = {};
    state.bloglist.forEach((blog) => {
      visibilityObj[blog.id] = blog.visible;
    });
    return visibilityObj;
  });

  const dispatch = useDispatch();

  const handleToggleVisibility = (blogId) => {
    const currentVisibility = visibility[blogId];
    const blogVisible = {
      blogId,
      isVisible: !currentVisibility,
    };

    dispatch(toggleBlogVisibility(blogVisible));
  };

  const handleUpdateLikes = (blogId) => {
    dispatch(updateLikes(blogId));
  };
  const handleDeleteBlog = (blogId) => {
    console.log('Deleting blog with id:', blogId);
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(removeBlog(blogId));
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(showNotification('Logout successful!', 5));
  };
  console.log('Blog blogs ', blogs);

  return (
    <>
      {sessionUser?.username !== null && (
        <div>
          <h2>blogs</h2>
          {sessionUser?.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
          <span></span>
          <Togglable buttonLabel="create new blog">
            <BlogForm />
          </Togglable>
        </div>
      )}
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-list" style={blogStyle}>
          {blog.title} {blog.author}
          <button
            id="blog-show"
            onClick={() => handleToggleVisibility(blog.id)}
          >
            {visibility[blog.id] ? 'hide' : 'view'}
          </button>
          <div style={visibility[blog.id] ? {} : { display: 'none' }}>
            {blog.url}
            <br />
            likes {blog.likes}
            <button id="blog-like" onClick={() => handleUpdateLikes(blog.id)}>
              like
            </button>
            <br />
            {blog?.user?.name}
            <br />
            {blog?.user?.username === sessionUser?.username ? (
              <button
                id="blog-delete"
                onClick={() => handleDeleteBlog(blog.id)}
              >
                delete
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
