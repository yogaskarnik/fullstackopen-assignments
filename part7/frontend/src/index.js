import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import notificationReducer from './reducers/notificationReducer';
import bloglistReducer, { initializeBlogs } from './reducers/bloglistReducer';
import userReducer from './reducers/userReducer';
import blogService from './services/blogs';
import App from './App';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bloglist: bloglistReducer,
    user: userReducer,
  },
});

blogService.getAll().then((blogs) => {
  store.dispatch(initializeBlogs(blogs));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
