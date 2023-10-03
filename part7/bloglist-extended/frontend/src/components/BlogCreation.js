import { useDispatch } from 'react-redux';
import { storeBlog } from '../reducers/bloglistReducer';
import { showNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    dispatch(storeBlog(newBlog));
    dispatch(showNotification('Blog created successfully', 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type="text" name="title" />
          <Form.Label>author</Form.Label>
          <Form.Control type="text" name="author" />
          <Form.Label>url</Form.Label>
          <Form.Control type="text" name="url" />
          <Button variant="primary" type="submit" size="sm">
            create
          </Button>
          <Button variant="primary" type="reset" size="sm">
            reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
