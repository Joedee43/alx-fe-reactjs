import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const SearchUser = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we can\'t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="message">Loading...</div>}
      
      {error && <div className="message error">{error}</div>}
      
      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt={userData.login} className="avatar" />
          <div className="user-info">
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio || 'No bio available'}</p>
            <div className="stats">
              <span>Followers: {userData.followers}</span>
              <span>Following: {userData.following}</span>
              <span>Repos: {userData.public_repos}</span>
            </div>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;