import { useNavigate } from "react-router";
import { useAppDispatch } from "../Utiles/Hooks/useDispatch-hook";
import { useAppSelector } from "../Utiles/Hooks/useSelector-hook";
import useIsRecipeSaved from "../Utiles/Hooks/useIsRecipeSaved-hook";
import useIsRecipeLiked from "../Utiles/Hooks/useIsRecipeLiked-hook";
import { addFavoriteRecipeToUser, selectLogged ,addSavedRecipeToUser,removeSavedRecipeFromUser, removeFavoriteRecipeFromUser } from "../Redux/userSettings-slice";
import { rateRecipe } from "../Redux/recipes-slice";
import RecipeInterface from "../Interfaces/RecipeInterface";
import { Rate ,Button ,notification } from 'antd';
import { HeartFilled  } from '@ant-design/icons';
import styles from '../Styles/recipe-page.module.scss';
import { setRecipeCookingMode } from "../Redux/cookingMode-slice";


const Recipe = (recipeItem:RecipeInterface ) => {
     const recipe:RecipeInterface = recipeItem;

     const dispatch = useAppDispatch();
     const navigate = useNavigate ();

     const userId = useAppSelector(selectLogged);
     const isSaved = useIsRecipeSaved(recipe.id);
     const isLiked = useIsRecipeLiked(recipe.id);

     const handleRatingChange = (newRate:number) => {
           dispatch(rateRecipe({recipeId:recipe.id,rating:newRate}))
      };
     const handleLikeRecipe = () => {
            try {
              dispatch(addFavoriteRecipeToUser({userId,recipe}))
              openNotification('Recipe added to favorites');
            } catch (error: any) {
              openNotification(error.message);
            }
      };
     const handleUnLikeRecipe = () => {
        try {
          dispatch(removeFavoriteRecipeFromUser({userId,recipe}))
          openNotification('Recipe removed from favorites');
        } catch (error: any) { 
          openNotification(error.message);
        }
  };
     const handleSaveRecipe = () => {
      try {
        dispatch(addSavedRecipeToUser({userId,recipe}))
        openNotification('Recipe added to saved !');
      } catch (error: any) {
        openNotification(error.message);
      }
      };
     const handleUnSaveRecipe = () => {
        try {
          dispatch(removeSavedRecipeFromUser({userId,recipe}))
          dispatch(setRecipeCookingMode(null))
          openNotification('Recipe removed from  saved !');
        } catch (error: any) {
          openNotification(error.message);
        }
        };
    const handleStartCooking = () => {
          dispatch(setRecipeCookingMode(recipe))
          navigate('/cooking')
          };
          
     const [api, contextHolder] = notification.useNotification();
     const openNotification = (message: string) => {
       api.open({
         message: message,
         className: 'custom-class',
         style: {
           width: 600,
         },
       });
     }

    return  ( 
         <div className={styles.recipeContainer}>
          {contextHolder}
           <h1 className={styles.recipeContainer__title}>{recipe.title}</h1>
           <p className={styles.recipeContainer__category}>Category : {recipe.category}</p>
           <p className={styles.recipeContainer__time}>Time to cook : {recipe.time} minutes</p>
           <p className={styles.recipeContainer__description}>{recipe.description}</p>
           <p className={styles.recipeContainer__instructions}>Instructions :{recipe.instructions}</p>
           <p className={styles.recipeContainer__ingredientsTitle}>Ingredients :</p>
           <ul className={styles.recipeContainer__ingredients}>
              {recipe.ingredients.map((ingredient, index) => (
                <li className={styles.recipeContainer__ingredient} key={index}> - {ingredient.ingredient }</li>
              ))}
            </ul>
            <div className={styles.recipeContainer__ratingAndLikeContainer}>
             <div className={styles.recipeContainer__rating}>Average rating:{recipe.averageRating}  
             <Rate onChange={handleRatingChange} defaultValue={recipe.averageRating} />  
             </div>
           {userId && !isLiked &&  <HeartFilled className={styles.recipeContainer__notLiked} onClick={handleLikeRecipe} /> }
           {userId && isLiked &&  <HeartFilled className={styles.recipeContainer__liked} onClick={handleUnLikeRecipe} /> }
           </div>
           {userId && !isSaved &&  <Button className={styles.recipeContainer__button} onClick={handleSaveRecipe}>Add to saved recipes</Button>  }
           {userId && isSaved  && <Button className={styles.recipeContainer__button} onClick={handleUnSaveRecipe}>Remove from saved recipes</Button>  }

           {userId && isSaved &&  <Button className={styles.recipeContainer__startCookingButton}  onClick={handleStartCooking}>Start Cooking</Button>  }
       </div> 
    )     
}

export default Recipe;