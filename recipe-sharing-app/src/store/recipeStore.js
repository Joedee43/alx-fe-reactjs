import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
      ingredients: ['spaghetti', 'eggs', 'pecorino cheese', 'pancetta', 'black pepper'],
      instructions: 'Cook pasta, fry pancetta, mix eggs with cheese, combine everything'
    },
    {
      id: 2,
      title: 'Chocolate Chip Cookies',
      description: 'Soft and chewy cookies with chocolate chips',
      ingredients: ['flour', 'butter', 'sugar', 'chocolate chips', 'vanilla extract'],
      instructions: 'Mix ingredients, form cookies, bake at 350°F for 10-12 minutes'
    }
  ],
  
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),
  
  removeRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  }))
}));

export default useRecipeStore;