import { useState } from 'react';
import { searchUsers } from '../services/githubService';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import Loading from '../components/Loading';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchUsers(query);
      setUsers(results);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <Loading />}
      
      {error && <p className="error">{error}</p>}
      
      {users.length > 0 && <UserList users={users} />}
      
      {!loading && users.length === 0 && !error && (
        <p className="no-results">No users found. Try searching for a GitHub username.</p>
      )}
    </div>
  );
};

export default Home;