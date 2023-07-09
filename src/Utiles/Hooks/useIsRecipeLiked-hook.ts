import { useSelector } from 'react-redux';
import { getUserSavedRecipes } from '../../Redux/userSettings-slice';

const  useIsRecipeLiked = (recipeId: string): boolean =>{
  const userSavedRecipes = useSelector(getUserSavedRecipes);

  if(userSavedRecipes){
    const isSaved = userSavedRecipes.some(savedRecipeId => savedRecipeId.id === recipeId && savedRecipeId.favorite);
    return isSaved
  }else{
       return false
  }
}

export default useIsRecipeLiked;