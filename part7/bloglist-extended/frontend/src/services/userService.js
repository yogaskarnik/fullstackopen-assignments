import axios from 'axios';
const baseUrl = '/api/users';

const fetchAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('could not load users:', error);
    throw new Error(error.response.data.error || 'could not load users');
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('could not load user:', error);
    throw new Error(
      error.response.data.error || 'could not load user with id:',
      id
    );
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchAllUsers, getById };
