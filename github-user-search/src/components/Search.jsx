import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCodeBranch } from 'react-icons/fa';
import { fetchUserData } from '../services/githubService'; // Changed to fetchUserData

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
      const data = await fetchUserData(username); // Using fetchUserData
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">GitHub User Search</h1>
      
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-blue-400"
        >
          {loading ? 'Searching...' : 'Search User'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p>Loading user data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img 
                src={userData.avatar_url} 
                alt={userData.login} 
                className="w-32 h-32 rounded-full border-2 border-blue-100"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">{userData.name || userData.login}</h2>
              
              {userData.bio && (
                <p className="text-gray-600 mt-2">{userData.bio}</p>
              )}
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="flex items-center mt-1">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    {userData.location || 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Repositories</h3>
                  <p className="flex items-center mt-1">
                    <FaCodeBranch className="mr-2 text-gray-400" />
                    {userData.public_repos}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Followers</h3>
                  <p className="mt-1">{userData.followers}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Following</h3>
                  <p className="mt-1">{userData.following}</p>
                </div>
              </div>
              
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;