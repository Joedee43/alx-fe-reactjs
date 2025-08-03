import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const SearchBar = () => {
  const [localTerm, setLocalTerm] = useState('');
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const handleChange = (e) => {
    setLocalTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by name or description..."
        value={localTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;