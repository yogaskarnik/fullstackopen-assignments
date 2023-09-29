import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/userReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(users);

  return (
    <div>
      <h3>Users</h3>
      {users && users.length > 0 ? (
        <table>
          {/* ... table headers ... */}
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users or no users found...</p>
      )}
    </div>
  );
};

export default Users;
