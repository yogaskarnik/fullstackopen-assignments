import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/bloglistReducer';
import { showNotification } from '../reducers/notificationReducer';

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
    dispatch(createBlog(newBlog));
    dispatch(showNotification('Blog created successfully', 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title <input name="title" />
        </div>
        <div>
          author <input name="author" />
        </div>
        <div>
          url <input name="url" />
        </div>
        <button id="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
