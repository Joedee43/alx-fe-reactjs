import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish',
      ingredients: ['pasta', 'eggs', 'cheese', 'pancetta'],
      prepTime: 20,
      cookTime: 15,
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade cookies',
      ingredients: ['flour', 'butter', 'sugar', 'chocolate chips'],
      prepTime: 15,
      cookTime: 10,
      difficulty: 'Easy'
    }
  ],
  
  // Search and filter state
  searchTerm: '',
  filters: {
    ingredients: [],
    maxPrepTime: null,
    difficulty: null
  },
  
  // Actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilter: (filterName, value) => set((state) => ({
    filters: { ...state.filters, [filterName]: value }
  })),
  
  // Computed filtered recipes
  getFilteredRecipes: () => {
    const { recipes, searchTerm, filters } = get();
    
    return recipes.filter(recipe => {
      // Search term matching (title or description)
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Ingredient filter
      const matchesIngredients = filters.ingredients.length === 0 ||
        filters.ingredients.every(ingredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
      
      // Prep time filter
      const matchesPrepTime = !filters.maxPrepTime || 
        (recipe.prepTime + recipe.cookTime) <= filters.maxPrepTime;
      
      // Difficulty filter
      const matchesDifficulty = !filters.difficulty || 
        recipe.difficulty === filters.difficulty;
      
      return matchesSearch && matchesIngredients && matchesPrepTime && matchesDifficulty;
    });
  }
}));

export default useRecipeStore;