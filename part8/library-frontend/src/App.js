import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { __DEV__ } from '@apollo/client/utilities/globals';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token')
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState('authors');
  const client = useApolloClient();

  if (__DEV__) {
    loadDevMessages();
    loadErrorMessages();
  }
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendation')}>
              recommended
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook setError={notify} show={page === 'add'} />
      <Recommendations setError={notify} show={page === 'recommendation'} />
      {page === 'login' && (
        <LoginForm setError={notify} setToken={setToken} setPage={setPage} />
      )}
    </div>
  );
};

export default App;
