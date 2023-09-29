import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { userLogin } from './reducers/userReducer';
import './index.css';
import Users from './components/Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
            <Routes>
              <Route
                path="/"
                element={<Blog sessionUser={currentUser} />}
              ></Route>
              <Route path="/users" element={<Users />}></Route>
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
