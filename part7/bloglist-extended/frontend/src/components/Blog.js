import { useSelector } from 'react-redux';
import Togglable from './Togglable';
import BlogCreation from './BlogCreation';
import './Blog.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogs = useSelector((state) => state.bloglist);

  return (
    <>
      <Togglable buttonLabel="create new blog">
        <BlogCreation />
      </Togglable>

      {blogs.map((blog) => (
        <div key={blog.id} className="blog-list">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blog;
