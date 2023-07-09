import Recipe from '../../Interfaces/RecipeInterface';

// Custom hook for sorting recipes
export const useRecipeSorting = (recipes: Recipe[]) => {
    
    return [...recipes].sort((a,b) => b.averageRating - a.averageRating);

};