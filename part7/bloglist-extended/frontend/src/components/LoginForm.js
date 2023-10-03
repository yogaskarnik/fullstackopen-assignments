import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    dispatch(loginUser(credentials));
    dispatch(showNotification('Login successful!', 5));
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control
            id="username"
            type="text"
            name="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
          <Button variant="primary" type="reset">
            reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
