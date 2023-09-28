import { createSlice } from '@reduxjs/toolkit';
import { showNotification } from './notificationReducer';
import blogService from '../services/blogs';

const initialState = [];
const bloglist = createSlice({
  name: 'bloglist',
  initialState,
  reducers: {
    initializeBlogs(state, action) {
      return action.payload.map((blog) => ({ ...blog, visible: false }));
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
    deleteBlog(state, action) {
      const blogId = action.payload;
      return state.filter((blog) => blog.id !== blogId);
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
  deleteBlog,
  toggleBlogVisibility,
} = bloglist.actions;

export const fetchBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(initializeBlogs(blogs));
  } catch (error) {
    dispatch(showNotification('Failed to fetch blogs.', 5));
  }
};

export const updateLikes = (blogId) => async (dispatch, getState) => {
  try {
    const blog = getState().bloglist.find((blog) => blog.id === blogId);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(updatedBlog.id, updatedBlog);
    dispatch(incrementLikes({ id: blogId }));
    dispatch(fetchBlogs());
  } catch (error) {
    dispatch(showNotification('Failed to update likes.', 5));
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
