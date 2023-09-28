import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { showNotification } from '../reducers/notificationReducer';
import './Blog.css';
import BlogList from './BlogList';

const Blog = ({ sessionUser }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(showNotification('Logout successful!', 5));
  };

  return (
    <>
      <div className="header">
        <h2>blogs</h2>
        {sessionUser?.username !== null && (
          <div className="user-info">
            {sessionUser?.name} logged in
            <button onClick={() => handleLogout()}>logout</button>
            <span></span>
          </div>
        )}
      </div>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <BlogList sessionUser={sessionUser} />
    </>
  );
};

export default Blog;
