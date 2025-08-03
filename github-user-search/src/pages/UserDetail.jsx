import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../services/githubService';
import Loading from '../components/Loading';

const UserDetail = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails(username);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="user-detail">
      <div className="user-header">
        <img src={user.avatar_url} alt={user.login} />
        <h1>{user.name || user.login}</h1>
        {user.bio && <p className="bio">{user.bio}</p>}
      </div>
      
      <div className="user-stats">
        <div>
          <strong>Followers:</strong> {user.followers}
        </div>
        <div>
          <strong>Following:</strong> {user.following}
        </div>
        <div>
          <strong>Public Repos:</strong> {user.public_repos}
        </div>
      </div>
      
      <a 
        href={user.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-link"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default UserDetail;