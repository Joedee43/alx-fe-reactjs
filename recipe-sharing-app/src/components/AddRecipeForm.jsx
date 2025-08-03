import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState(''); // Added setTitle state
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientsArray = ingredients
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    addRecipe({
      title,
      description,
      ingredients: ingredientsArray,
      instructions
    });

    // Reset form including title
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Using setTitle
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma separated):</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;