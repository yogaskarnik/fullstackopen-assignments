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

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchAllUsers };
