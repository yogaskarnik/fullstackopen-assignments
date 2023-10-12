import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState(null);
  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const getUniqueGenres = (allBooks) => {
    return [...new Set(allBooks.flatMap((books) => books.genres))];
  };

  const uniqueGenres = getUniqueGenres(data?.allBooks);

  const filterByGenre = (genre) => {
    setFilter(data?.allBooks.filter((books) => books.genres.includes(genre)));
  };

  const booksToShow = filter || data?.allBooks || [];

  return (
    <div>
      <h2>books</h2>
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
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => filterByGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  );
};

export default Books;
