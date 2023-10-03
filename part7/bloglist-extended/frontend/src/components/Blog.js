import { useSelector } from 'react-redux';
import BlogCreation from './BlogCreation';
import Togglable from './Togglable';
import './Blog.css';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Blog = () => {
  const blogs = useSelector((state) => state.bloglist);

  return (
    <div className="container">
      <Togglable buttonLabel="create new">
        <BlogCreation />
      </Togglable>
      <Table striped>
        <thead>
          <tr>
            <td>Blog title</td>
            <td>Author</td>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blog;
