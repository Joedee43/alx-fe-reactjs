import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <Link to={`/user/${user.login}`}>
        <img src={user.avatar_url} alt={user.login} />
        <h3>{user.login}</h3>
      </Link>
    </div>
  );
};

export default UserCard;