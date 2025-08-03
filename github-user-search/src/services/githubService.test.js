import axios from 'axios';
import { fetchUserData } from './githubService';

jest.mock('axios');

describe('fetchUserData', () => {
  it('should fetch user data successfully', async () => {
    const mockUser = {
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://test.com/avatar.jpg',
      html_url: 'https://github.com/testuser'
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    const user = await fetchUserData('testuser');
    
    expect(user).toEqual(mockUser);
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser'
    );
  });

  it('should handle 404 error', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });
    
    await expect(fetchUserData('nonexistent'))
      .rejects
      .toThrow('User not found');
  });

  it('should handle other API errors', async () => {
    axios.get.mockRejectedValue({ response: { status: 500 } });
    
    await expect(fetchUserData('testuser'))
      .rejects
      .toThrow('API Error: 500');
  });

  it('should handle network errors', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    
    await expect(fetchUserData('testuser'))
      .rejects
      .toThrow('Network Error: Could not connect to GitHub API');
  });
});