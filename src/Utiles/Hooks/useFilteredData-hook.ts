import { useState, useEffect } from 'react';
import { selectAllRecipes } from '../../Redux/recipes-slice';
import { useAppSelector } from './useSelector-hook';
import Recipe from '../../Interfaces/RecipeInterface';


const useFilterAndSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeCategory, setTimeCategory] = useState<string>('');
  const [foodCategory, setFoodCategory] = useState<string>('');
  
  const [filteredData, setFilteredData] = useState<Recipe[]>([]);
  
  const recipes = useAppSelector( selectAllRecipes );
  useEffect(() => {
    const filterAndSearchData = () => {
        const filtered = recipes.filter((recipe) => {

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

            return matchesSearchQuery && matchesTimeCategory && matchesFoodCategory;
      });

        setFilteredData(filtered);
     
    };

    filterAndSearchData();
  }, [recipes, searchQuery, timeCategory, foodCategory ]);

  return {
    searchQuery,
    setSearchQuery,
    timeCategory,
    setTimeCategory,
    foodCategory,
    setFoodCategory,
    filteredData,
  };
};

export default useFilterAndSearch;
