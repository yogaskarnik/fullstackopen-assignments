import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_NUMBER } from '../queries';

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [changeBirthYear] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const updateBirthYear = (event) => {
    event.preventDefault();
    changeBirthYear({ variables: { name, born } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors?.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>update birth year</h2>
        <form onSubmit={updateBirthYear}>
          <div>
            Author
            <select
              name="selectAuthors"
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              <option value="" disabled>
                Select an author
              </option>
              {data?.allAuthors?.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            Set Birth Year
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value, 10))}
            ></input>
          </div>
          <button type="submit">update boirth year</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
