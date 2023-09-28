import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import './index.css';
import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/bloglistReducer';
import { logoutUser } from './reducers/userReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const blogs = useSelector((state) => state.bloglist);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogService.getAll();
      dispatch(initializeBlogs(response));
    };
    fetchBlogs();
  }, [dispatch, user]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUser(user));

      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (performLogin) => {
    try {
      const user = await loginService.login(performLogin);
      console.log('API Response:', user);
      if (!user) {
        dispatch(showNotification('Username or password wrong', 5));
        return;
      }
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(showNotification('Login successful!', 5));
    } catch (error) {
      dispatch(showNotification(error.response.data.error, 5));
    }
  };

  const handleUpdateLikes = async (blogId) => {
    try {
      const blog = blogs.find((blog) => blog.id === blogId);
      const blogToUpdate = {
        ...blog,
        likes: Number(blog.likes) + 1,
        user: user,
      };
      await blogService.update(blogToUpdate.id, blogToUpdate);
    } catch (error) {
      dispatch(showNotification(error.response.data.error, 5));
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      let blogToDelete = blogs.find((blog) => blog.id === blogId);
      console.log('blogToDelete ', blogToDelete);
      const confirmDelete = window.confirm(
        `Removing blog ${blogToDelete.title} by ${blogToDelete.author}`
      );
      if (confirmDelete) {
        await blogService.deleteBlog(blogToDelete.id);
        dispatch(
          showNotification(
            `Blog - ${blogToDelete.title} by ${blogToDelete.author} has been removed`,
            5
          )
        );
      }
    } catch (error) {
      dispatch(showNotification(error.response.data.error, 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser');
    dispatch(logoutUser());
  };

  return (
    <div>
      <Notification />
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
          {user?.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      {user !== null && (
        <Togglable buttonLabel="create new blog">
          <BlogForm />
        </Togglable>
      )}
      {user !== null && (
        <Blog
          blogs={blogs}
          sessionUser={user}
          handleUpdateLikes={handleUpdateLikes}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  );
};

export default App;
