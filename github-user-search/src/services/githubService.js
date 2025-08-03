import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`API Error: ${error.response.status}`);
    }
    throw new Error('Network Error: Could not connect to GitHub API');
  }
};