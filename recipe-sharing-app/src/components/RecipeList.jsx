import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.getFilteredRecipes());
  const recipesCount = filteredRecipes.length;

  return (
    <div className="recipe-list">
      <div className="results-info">
        {recipesCount === 0 ? (
          <p>No recipes found matching your criteria.</p>
        ) : (
          <p>Showing {recipesCount} {recipesCount === 1 ? 'recipe' : 'recipes'}</p>
        )}
      </div>
      
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <Link to={`/recipe/${recipe.id}`} className="recipe-link">
            <h3>{recipe.title}</h3>
            <p className="description">{recipe.description}</p>
            <div className="recipe-meta">
              <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
              <span>🧑‍🍳 {recipe.difficulty}</span>
              <span>🥗 {recipe.ingredients.length} ingredients</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;