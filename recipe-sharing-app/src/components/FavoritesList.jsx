import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  
  const favoriteRecipes = favorites.map(id => 
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean);

  // Update recommendations when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  return (
    <div className="favorites-list">
      <h2>My Favorite Recipes</h2>
      
      {favoriteRecipes.length === 0 ? (
        <p className="empty-message">You haven't favorited any recipes yet!</p>
      ) : (
        <ul className="recipes-grid">
          {favoriteRecipes.map(recipe => (
            <li key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="description">{recipe.description}</p>
              </Link>
              <FavoriteButton recipeId={recipe.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;