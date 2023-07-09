import { useEffect, useState } from "react";
import IngredientProps from "../Interfaces/IngredientPropsInterface";
import { Typography } from 'antd';

import styles from '../Styles/cooking-page.module.css';
const Ingredient: React.FC<IngredientProps> = ({
  ingredient,
  usedIngredientsNumber,
  setUsedIngredientsNumber,
}) => {


  const [isUsed, setIsUsed] = useState(false);
  const { Text } = Typography;

  const ingredientClickHandler = () => {
    if (isUsed) {
      setUsedIngredientsNumber(usedIngredientsNumber - 1);
    } else {
      setUsedIngredientsNumber(usedIngredientsNumber + 1);
    }
    setIsUsed(!isUsed);
  }

  useEffect(() => {
    if (usedIngredientsNumber === 0) {
      setIsUsed(false);
    }
  }, [usedIngredientsNumber])

  return <Text className={styles.recipeContainer__ingredient} onClick={ingredientClickHandler} delete={isUsed}>{ingredient}</Text>

}

export default Ingredient;