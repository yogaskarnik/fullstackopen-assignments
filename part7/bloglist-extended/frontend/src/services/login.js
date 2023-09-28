import axios from 'axios';
const baseUrl = '/api/login';

const attemptLogin = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.error('Unauthorized:', error);
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error(error.response.data.error || 'Unauthorized');
      }

      throw new Error(
        error.response.data.error || 'Something went wrong during login'
      );
    }
    throw new Error('Network error or unexpected error during login');
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { attemptLogin };
