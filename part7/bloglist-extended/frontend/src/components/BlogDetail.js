import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { updateLikes } from '../reducers/bloglistReducer';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlog = await blogService.getById(id);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error('error fetching blog by id:', error);
      }
    };

    fetchBlogs();
  }, [id]);

  const handleUpdateLikes = (blogId) => {
    dispatch(updateLikes(blogId));
  };

  return (
    <div>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <p>
            {blog.url}
            <br />
            {blog.likes} likes
            <button id="blog-like" onClick={() => handleUpdateLikes(blog.id)}>
              like
            </button>
            <br />
            added by {blog.author}
          </p>
        </>
      ) : (
        <p>No blog found with the provided ID</p>
      )}
    </div>
  );
};

export default BlogDetail;
