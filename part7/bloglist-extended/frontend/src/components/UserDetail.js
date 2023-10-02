import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import userService from '../services/userService';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  console.log('id ', id);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getById(id);
        setUser(fetchedUser);
      } catch (error) {
        console.error('error fetching user by id:', error);
      }
    };

    fetchUser();
  }, [id]);

  console.log('user ', user);

  return (
    <div>
      {user ? <h2>{user.name}</h2> : <p>No user found with the provided ID</p>}
      <div>
        <p>added blogs</p>
        <ul>
          {user && user.blogs ? (
            user.blogs.map((blog) => <li>{blog.title}</li>)
          ) : (
            <p>No blogs added by this user</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDetail;
