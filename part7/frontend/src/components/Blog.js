import { useDispatch, useSelector } from 'react-redux';
import {
  incrementLikes,
  deleteBlog,
  toggleBlogVisibility,
} from '../reducers/bloglistReducer';

const Blog = ({ blogs, sessionUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const visibility = useSelector((state) => {
    const visibilityObj = {};
    state.bloglist.forEach((blog) => {
      visibilityObj[blog.id] = blog.visible;
    });
    return visibilityObj;
  });

  const dispatch = useDispatch();

  const handleToggleVisibility = (blogId) => {
    const currentVisibility = visibility[blogId];
    const blogVisible = {
      blogId,
      isVisible: !currentVisibility,
    };

    dispatch(toggleBlogVisibility(blogVisible));
  };

  const handleUpdateLikes = (blogId) => {
    dispatch(incrementLikes({ id: blogId }));
  };
  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlog({ id: blogId }));
  };

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-list" style={blogStyle}>
          {blog.title} {blog.author}
          <button
            id="blog-show"
            onClick={() => handleToggleVisibility(blog.id)}
          >
            {visibility[blog.id] ? 'hide' : 'view'}
          </button>
          <div style={visibility[blog.id] ? {} : { display: 'none' }}>
            {blog.url}
            <br />
            likes {blog.likes}
            <button id="blog-like" onClick={() => handleUpdateLikes(blog.id)}>
              like
            </button>
            <br />
            {blog?.user?.name}
            <br />
            {blog?.user?.username === sessionUser?.username ? (
              <button
                id="blog-delete"
                onClick={() => handleDeleteBlog(blog.id)}
              >
                delete
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
