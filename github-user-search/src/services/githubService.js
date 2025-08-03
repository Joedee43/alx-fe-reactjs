import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const searchUsers = async ({ query, location, minRepos, page = 1 }) => {
  try {
    let searchQuery = query;
    if (location) searchQuery += `+location:${location}`;
    if (minRepos) searchQuery += `+repos:>${minRepos}`;
    
    const response = await axios.get(`${API_BASE_URL}/search/users`, {
      params: {
        q: searchQuery,
        page,
        per_page: 9
      }
    });

    // Fetch additional details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(`${API_BASE_URL}/users/${user.login}`);
        return {
          ...user,
          ...userDetails.data
        };
      })
    );

    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to search users');
  }
};