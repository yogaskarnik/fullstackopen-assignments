import React, { useEffect } from 'react';
import blogService from '../services/blogs';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes, storeComments } from '../reducers/bloglistReducer';
import { Form, Button } from 'react-bootstrap';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.bloglist.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await blogService.getById(id);
      } catch (error) {
        console.error('error fetching blog by id:', error);
      }
    };

    fetchBlogs();
  }, [id]);

  const handleUpdateLikes = (blogId) => {
    dispatch(updateLikes(blogId));
  };

  const addComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comments.value;
    dispatch(storeComments(id, comment));

    event.target.comments.value = '';
  };

  return (
    <div className="container">
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <p>
            {blog.url}
            <br />
            {blog.likes} likes
            <Button
              variant="primary"
              type="submit"
              size="sm"
              onClick={() => handleUpdateLikes(blog.id)}
            >
              like
            </Button>
            <br />
            added by {blog.author}
          </p>

          <p>comments</p>

          <Form onSubmit={addComment}>
            <Form.Group>
              <Form.Control type="text" name="comments" />
              <Button variant="primary" type="submit" size="sm">
                add comment
              </Button>
            </Form.Group>
          </Form>

          <ul>
            {blog?.comments?.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No blog found with the provided ID</p>
      )}
    </div>
  );
};

export default BlogDetail;
