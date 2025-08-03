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
      difficulty: 'Medium',
      tags: ['italian', 'pasta', 'dinner']
    },
    {
      id: 2,
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade cookies',
      ingredients: ['flour', 'butter', 'sugar', 'chocolate chips'],
      prepTime: 15,
      cookTime: 10,
      difficulty: 'Easy',
      tags: ['dessert', 'baking', 'cookies']
    },
    // More recipes...
  ],
  
  // User favorites
  favorites: [],
  
  // Recommendations
  recommendations: [],
  
  // Actions
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state;
  }),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set((state) => {
    const isFavorite = state.favorites.includes(recipeId);
    return {
      favorites: isFavorite
        ? state.favorites.filter(id => id !== recipeId)
        : [...state.favorites, recipeId]
    };
  }),
  
  // Recommendation logic
  generateRecommendations: () => set((state) => {
    if (state.favorites.length === 0) {
      // If no favorites, show popular recipes
      return { 
        recommendations: [...state.recipes]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      };
    }
    
    // Get tags from favorite recipes
    const favoriteTags = state.favorites.flatMap(id => {
      const recipe = state.recipes.find(r => r.id === id);
      return recipe?.tags || [];
    });
    
    // Count tag occurrences
    const tagCounts = favoriteTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
    
    // Score recipes based on matching tags
    const scoredRecipes = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id)) // Exclude favorites
      .map(recipe => {
        const score = recipe.tags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);
        return { ...recipe, score };
      })
      .filter(recipe => recipe.score > 0) // Only recipes with matching tags
      .sort((a, b) => b.score - a.score); // Highest score first
    
    return {
      recommendations: scoredRecipes.slice(0, 3) // Top 3 recommendations
    };
  })
}));

export default useRecipeStore;