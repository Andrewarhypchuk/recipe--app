import useFilteredUserData from '../Utiles/Hooks/useFilteredUserData-hook';
import RecipeInterface from '../Interfaces/RecipeInterface';
import Recipe from "./RecipeComponent";
import { Select ,Input,Checkbox } from 'antd';

import styles from '../Styles/start-page.module.css';
const  UserRecipesListComponent = () => {
  const {
    searchQuery,
    setSearchQuery,
    setTimeCategory,
    setFoodCategory,
    favoriteOnly,
    setFavoriteOnly,
    filteredData
  } = useFilteredUserData();

  const handleTimeCategoryChange = (value: string) => {
    setTimeCategory(value);
  };
  const handleFoodCategoryChange = (value: string) => {
    setFoodCategory(value);
  };
  const handleFavoriteCheckBox = () => {
        setFavoriteOnly(!favoriteOnly)
  };

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
          <Checkbox onChange={handleFavoriteCheckBox}>Favorite only</Checkbox>

      {filteredData.length !== 0 &&  <ul>
        {filteredData.map((recipe: RecipeInterface) => (
             <Recipe key={recipe.id} {...recipe}  />
        ))}
      </ul>}
      {filteredData.length === 0 && <div> No recipes found</div> }
    </div>
  );
};

export default UserRecipesListComponent;
