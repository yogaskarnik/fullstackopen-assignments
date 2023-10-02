import { createSlice } from '@reduxjs/toolkit';
import { showNotification } from './notificationReducer';
import blogService from '../services/blogs';

const initialState = [];
const bloglist = createSlice({
  name: 'bloglist',
  initialState,
  reducers: {
    initializeBlogs(state, action) {
      return action.payload.map((blog) => ({
        ...blog,
        visible: false,
      }));
    },
    incrementLikes(state, action) {
      const { id } = action.payload;
      const blog = state.find((blog) => blog.id === id);
      if (blog) {
        blog.likes += 1;
      }
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const blogIndex = state.findIndex((blog) => blog.id === updatedBlog.id);
      if (blogIndex !== -1) {
        state[blogIndex] = updatedBlog;
      }
    },
    delBlog(state, action) {
      const { id } = action.payload;
      const newState = state.filter((blog) => blog.id !== id);
      return newState;
    },
    toggleBlogVisibility(state, action) {
      const { blogId, isVisible } = action.payload;
      const blog = state.find((blog) => blog.id === blogId);
      if (blog) {
        blog.visible = isVisible;
      }
    },
  },
});

export const {
  initializeBlogs,
  incrementLikes,
  createBlog,
  updateBlog,
  delBlog,
  toggleBlogVisibility,
} = bloglist.actions;

export const fetchBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(initializeBlogs(blogs));
  } catch (error) {
    console.error(error);
    dispatch(showNotification('Failed to fetch blogs.', 5));
  }
};

export const updateLikes = (blogId) => async (dispatch, getState) => {
  try {
    const blog = getState().bloglist.find((blog) => blog.id === blogId);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(updatedBlog.id, updatedBlog);
    dispatch(incrementLikes({ id: blogId }));
  } catch (error) {
    console.error(error);
    dispatch(showNotification(error.message || 'Failed to update likes.', 5));
  }
};

export const storeBlog = (newBlog) => async (dispatch) => {
  try {
    const createdBlog = await blogService.create({ ...newBlog });
    dispatch(createBlog(createdBlog));
  } catch (error) {
    console.error(error);
    dispatch(showNotification('Failed to create blog.', 5));
  }
};

export const removeBlog = (blogId) => async (dispatch) => {
  try {
    const deletedBlogResponse = await blogService.deleteBlog(blogId);
    if (deletedBlogResponse.status === 204 || !deletedBlogResponse) {
      dispatch(delBlog({ id: blogId }));
    } else {
      dispatch(showNotification('Failed to delete blog.', 5));
    }
  } catch (error) {
    console.error(error);
    dispatch(showNotification(error.message || 'Failed to delete blog.', 5));
  }
};

export const toggleVisibility = (blogId, isVisible) => {
  return {
    type: toggleBlogVisibility.type,
    payload: {
      blogId,
      isVisible,
    },
  };
};

export default bloglist.reducer;
