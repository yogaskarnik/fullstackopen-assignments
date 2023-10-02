import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <div>
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
          <>
            <div className="header">
              <h2>blogs</h2>
              {currentUser?.username !== null && (
                <div className="user-info">
                  {currentUser?.name} logged in
                  <button onClick={() => handleLogout()}>logout</button>
                  <span></span>
                </div>
              )}
            </div>
            <Routes>
              <Route path="/" element={<Blog />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
