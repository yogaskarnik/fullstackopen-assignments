import { useQuery } from '@apollo/client';
import { ALL_BOOKS, CURRENT_USER } from '../queries';

const Recommendations = (props) => {
  const userQuery = useQuery(CURRENT_USER);
  const favoriteGenre = userQuery?.data?.me?.favoriteGenre;
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (!props.show) {
    return null;
  }

  if (userQuery.loading || booksQuery.loading) return <p>Loading...</p>;
  if (userQuery.error || booksQuery.error) return <p>Error!</p>;

  const booksToShow = booksQuery?.data?.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
