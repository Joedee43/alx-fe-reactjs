import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );

  if (!recipe) {
    return <div className="not-found">Recipe not found</div>;
  }

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to all recipes</Link>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <FavoriteButton recipeId={recipe.id} />
      </div>
      
      <p className="description">{recipe.description}</p>
      
      <div className="recipe-meta">
        <span>⏱️ Total: {recipe.prepTime + recipe.cookTime} mins</span>
        <span>🧑‍🍳 Difficulty: {recipe.difficulty}</span>
      </div>
      
      <div className="section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="section">
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
      
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="tags-section">
          <h3>Tags</h3>
          <div className="tags">
            {recipe.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;