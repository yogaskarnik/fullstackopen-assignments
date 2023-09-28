import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { userLogin } from './reducers/userReducer';
import './index.css';

const App = () => {
  const user = useSelector((state) => state.user);
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
      <div></div>
      {user === null && <h2>log in to application</h2>}
      {user === null && (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      )}
      {user !== null && <Blog sessionUser={user} />}
    </div>
  );
};

export default App;
