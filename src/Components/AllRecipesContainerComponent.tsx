import { useEffect, useState } from 'react';
import useFilterAndSearch from '../Utiles/Hooks/useFilteredData-hook';
import { useRecipeSorting } from '../Utiles/Hooks/useSortedData-hook';
import RecipeInterface from '../Interfaces/RecipeInterface';
import Recipe from "./RecipeComponent";
import { Select ,Input ,Checkbox} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import styles from '../Styles/start-page.module.css';


const RecipeListComponent = () => {
  const {
    searchQuery,
    setSearchQuery,
    setTimeCategory,
    setFoodCategory,
    filteredData,
  } = useFilterAndSearch();
  const [recipes,setRecipes] =useState<RecipeInterface[]>([]);
  const sortedRecipesByRatings  = useRecipeSorting(filteredData);

  const handleTimeCategoryChange = (value: string) => {
    setTimeCategory(value);
  };
  const handleFoodCategoryChange = (value: string) => {
    setFoodCategory(value);
  };
  const handlePopularCheckBox = (event:CheckboxChangeEvent) => {
    if(event.target.checked){
          setRecipes(sortedRecipesByRatings)
    }else{
           setRecipes(filteredData)
    }
};

useEffect(()=>{
  setRecipes(filteredData)
})

  return (
    <div>
      <Input
        className={styles.searchInput}
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search by title or ingredients"
      />
      <Select
       defaultValue="All"
       onChange={handleTimeCategoryChange}
       style={{ width:250 ,margin:10}}
       options={[
        { value: '', label: '  All' },
        { value: 'fast', label: 'less than 35 minutes' },
        { value: 'medium', label: 'from 35 to 60 minutes' },
        { value: 'long', label: 'more than 60 minutes' }
      ]}
    />
          <Select
       defaultValue="All"
       onChange={handleFoodCategoryChange}
       style={{ width: 220,margin:10 }}
       options={[
        { value: '', label: 'All' },
        { value: 'Pizza', label: 'Pizza' },
        { value: 'Salad', label: 'Salad' },
        { value: 'Soup', label: 'Soup' },
        { value: 'Meats', label: 'Meats' },
        { value: 'BBQ and Grilling', label: 'BBQ and Grilling' },
        { value: 'Sushi', label: 'Sushi' },
        { value: 'Other', label: 'Other' }
      ]}
    />
     <Checkbox onChange={handlePopularCheckBox}>See popular first</Checkbox>
      
      {recipes.length !== 0 &&  <ul>
        {recipes.map((recipe: RecipeInterface) => (
             <Recipe key={recipe.id} {...recipe}  />
        ))}
      </ul>}
      {recipes.length === 0 && <div> No recipes found</div> }
    </div>
  );
};

export default RecipeListComponent;
