import Togglable from './Togglable';
import BlogForm from './BlogForm';
import './Blog.css';
import BlogList from './BlogList';

const Blog = () => {
  return (
    <>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <BlogList />
    </>
  );
};

export default Blog;
