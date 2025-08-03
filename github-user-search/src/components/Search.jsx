import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user'); // Exact match to requirement
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
          required
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <div className="status-message">Loading...</div>}
      
      {error && (
        <div className="status-message error">
          Looks like we cant find the user {/* Exact match in display */}
        </div>
      )}
      
      {userData && (
        <div className="user-card">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="avatar"
          />
          <div className="user-details">
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio || 'No bio available'}</p>
            
            <div className="user-stats">
              <div>
                <strong>Followers:</strong> {userData.followers}
              </div>
              <div>
                <strong>Following:</strong> {userData.following}
              </div>
              <div>
                <strong>Repositories:</strong> {userData.public_repos}
              </div>
            </div>
            
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;