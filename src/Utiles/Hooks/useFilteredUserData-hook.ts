import { useState, useEffect } from 'react';
import { useAppSelector } from './useSelector-hook';
import { getUserSavedRecipes } from '../../Redux/userSettings-slice';
import Recipe from '../../Interfaces/RecipeInterface';

const useFilteredUserData= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeCategory, setTimeCategory] = useState<string>('');
  const [foodCategory, setFoodCategory] = useState<string>('');
  const [favoriteOnly, setFavoriteOnly] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Recipe[]>([]);
  
  const recipes = useAppSelector( getUserSavedRecipes);
  useEffect(() => {
    const filterAndSearchData = () => {
        const filtered = recipes?.filter((recipe) => {
       
        const isFavorite = recipe.favorite;

        const matchesSearchQuery =
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesTimeCategory =
           timeCategory === '' ||
          (timeCategory === 'fast' && recipe.time < 35) ||
          (timeCategory === 'medium' && recipe.time >= 35 && recipe.time <= 60) ||
          (timeCategory === 'long' && recipe.time > 60);

        const matchesFoodCategory =
           foodCategory === '' || recipe.category === foodCategory;
            
            if(favoriteOnly){
              return isFavorite && matchesSearchQuery && matchesTimeCategory && matchesFoodCategory;
            }
            return matchesSearchQuery && matchesTimeCategory && matchesFoodCategory;
      });

      setFilteredData(filtered ? filtered: []);
    };

    filterAndSearchData();
  }, [recipes, searchQuery, timeCategory, foodCategory, favoriteOnly]);

  return {
    searchQuery,
    setSearchQuery,
    timeCategory,
    setTimeCategory,
    foodCategory,
    setFoodCategory,
    favoriteOnly,
    setFavoriteOnly,
    filteredData,
  };
};

export default useFilteredUserData;
