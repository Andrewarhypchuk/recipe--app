import { useEffect, useState } from 'react';
import { useAppSelector } from '../Utiles/Hooks/useSelector-hook';
import { selectCookingModeRecipe } from '../Redux/cookingMode-slice';
import Ingredient from './IngredientComponent';
import { Progress,Button  } from 'antd';

import styles from '../Styles/cooking-page.module.css';

const CookingMode = () => {
  const [usedIngredientsNumber,setUsedIngredientsNumber ] = useState(0);
  const [cookingProgress,setCookingProgress] = useState(0);

  const recipe =  useAppSelector(selectCookingModeRecipe);

  const resetCookingMode = () => {
    setUsedIngredientsNumber(0);
  }; 
  
  useEffect(()=>{
        const newProgress = usedIngredientsNumber/recipe!.ingredients.length * 100;  
        setCookingProgress(newProgress);
  },[usedIngredientsNumber])

  return (
    <div className={styles.recipeContainer}>
      <Progress type="circle"   percent={cookingProgress} format={() => 'Done'} />
      <h2 className={styles.recipeContainer__title} >{recipe!.title}</h2>
      <div className={styles.recipeContainer__ingredients}>
        {recipe!.ingredients.map((ingredient, index) => (
            <Ingredient  key={index}   ingredient={ingredient.ingredient} usedIngredientsNumber={usedIngredientsNumber}  setUsedIngredientsNumber={setUsedIngredientsNumber} />
        ))}
     </div>
      <Button onClick={resetCookingMode}>Reset</Button>
    </div>
  );
};

export default CookingMode;
