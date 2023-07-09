import Recipe from './RecipeInterface';
interface User {
  id: string;
  username: string;
  email: string;
  savedRecipes: Recipe[];
  }
  
  export default User;
  