import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const FilterPanel = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const setFilter = useRecipeStore(state => state.setFilter);
  const filters = useRecipeStore(state => state.filters);

  const handleAddIngredient = () => {
    if (ingredientInput.trim() && !filters.ingredients.includes(ingredientInput.trim())) {
      setFilter('ingredients', [...filters.ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const removeIngredient = (ingredient) => {
    setFilter('ingredients', filters.ingredients.filter(i => i !== ingredient));
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <h3>Filter by Ingredients</h3>
        <div className="ingredient-input">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Add ingredient filter"
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        <div className="ingredient-tags">
          {filters.ingredients.map((ingredient, index) => (
            <span key={index} className="ingredient-tag">
              {ingredient}
              <button onClick={() => removeIngredient(ingredient)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Maximum Total Time (minutes)</h3>
        <input
          type="number"
          value={filters.maxPrepTime || ''}
          onChange={(e) => setFilter('maxPrepTime', e.target.value ? parseInt(e.target.value) : null)}
          placeholder="No limit"
          min="1"
        />
      </div>

      <div className="filter-group">
        <h3>Difficulty Level</h3>
        <select
          value={filters.difficulty || ''}
          onChange={(e) => setFilter('difficulty', e.target.value || null)}
        >
          <option value="">All levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <button 
        className="clear-filters"
        onClick={() => {
          setFilter('ingredients', []);
          setFilter('maxPrepTime', null);
          setFilter('difficulty', null);
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;