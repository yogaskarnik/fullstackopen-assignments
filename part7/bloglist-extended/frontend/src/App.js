import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { userLogin } from './reducers/userReducer';
import Users from './components/Users';
import { logoutUser } from './reducers/userReducer';
import { showNotification } from './reducers/notificationReducer';
import './index.css';
import UserDetail from './components/UserDetail';
import BlogDetail from './components/BlogDetail';
import { Button } from 'react-bootstrap';

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(userLogin(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(showNotification('Logout successful!', 5));
  };

  return (
    <div className="container">
      <Notification />
      <Router>
        {currentUser === null ? (
          <>
            <h2>Blog App Login</h2>
            <Togglable buttonLabel="login">
              <LoginForm />
            </Togglable>
          </>
        ) : (
          <div>
            <div>
              <Link className="navbar-style" to="/">
                home
              </Link>
              <Link className="navbar-style" to="/blogs">
                blogs
              </Link>
              <Link className="navbar-style" to="/users">
                users
              </Link>
              {currentUser?.username} logged in
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleLogout()}
                size="sm"
              >
                logout
              </Button>
            </div>

            <h2>blogs</h2>
            <Routes>
              <Route path="/" element={<Blog />}></Route>
              <Route path="/blogs" element={<Blog />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;
