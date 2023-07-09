import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Recipe from '../Interfaces/RecipeInterface';
import User from '../Interfaces/UserInterface';
import { RootState } from './redux-store';

interface UserState {
  users: User[];
  loggedInUserId: string | null;
}

const initialState: UserState = {
  users: [{
    id: '1',
    username: '1008036',
    email: 'andrewarhypchuk@gmail.com',
    savedRecipes: []
  }],
  loggedInUserId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const existingUser = state.users.find(user => user.username === action.payload.username);
      if (!existingUser) {
        state.users.push(action.payload);
        state.loggedInUserId = action.payload.id;
      }else{
        throw new Error();
      }
    },
    login: (state, action: PayloadAction<{ username: string;email: string }>) => {
      const { username, email } = action.payload;
      const user = state.users.find(user => user.username === username && user.email === email);
      if (user) {
        state.loggedInUserId = user.id;
      }else{
        throw new Error();
      }
    },
    logout: (state) => {
      state.loggedInUserId = null;
    },
    addFavoriteRecipeToUser: (state, action: PayloadAction<{ userId: string |null ; recipe:Recipe}>) => {
      const { userId, recipe } = action.payload;
      const user = state.users.find(user => user.id === userId)!;
      const isSaved = user.savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id);
      
      if (user && isSaved ) {
        user.savedRecipes = user.savedRecipes.map(savedRecipe =>
          savedRecipe.id === recipe.id ? { ...savedRecipe, favorite: true } : savedRecipe
        )
      } 
      if (user && !isSaved ) {
        user.savedRecipes.push({ ...recipe, favorite: true });
      } 
     
    },
    removeFavoriteRecipeFromUser: (state, action: PayloadAction<{ userId:string |null; recipe:Recipe }>) => {
      const { userId, recipe } = action.payload;
      const user = state.users.find(user => user.id === userId)!;
      const isSaved = user.savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id);
      
      if (user && isSaved ) {
        user.savedRecipes = user.savedRecipes.map(savedRecipe =>
          savedRecipe.id === recipe.id ? { ...savedRecipe, favorite: false } : savedRecipe
        )
      }
    },
    addSavedRecipeToUser: (state, action: PayloadAction<{ userId: string | null; recipe: Recipe }>) => {
      const { userId, recipe } = action.payload;
      const user = state.users.find(user => user.id === userId)!;
      const hasDuplicateRecipe = user.savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id);
    
      if (hasDuplicateRecipe) {
        throw new Error('You already added this recipe to your saved recipes');
      }else{
        const newRecipe = { ...recipe, favorite: false }
        user?.savedRecipes.push(newRecipe); 
      }
    },
    removeSavedRecipeFromUser: (state, action: PayloadAction<{ userId: string | null; recipe: Recipe  }>) => {
      const { recipe } = action.payload;
      const user = state.users.find(user => user.id === state.loggedInUserId)!;

      if (user) {
        user.savedRecipes = user.savedRecipes.filter(recipeItem => recipeItem.id !== recipe.id);
        }else{
          throw new Error('No such recipe in your saved recipes');
       }
    }
  },
});

export const {
  addUser,
  addFavoriteRecipeToUser,
  removeFavoriteRecipeFromUser,
  addSavedRecipeToUser,
  removeSavedRecipeFromUser,
  login,
  logout
} = userSlice.actions;
export const getUserSavedRecipes = (state: RootState) => {
      return state.userSettings.users.find((user) => user.id === state.userSettings.loggedInUserId)?.savedRecipes;
  }
export const selectLogged = (state: RootState) => state.userSettings.loggedInUserId;

export const selectSavedRecipe = (recipe: Recipe) => (state: RootState) => {
  return state.userSettings.users
  .find((user) => user.id === state.userSettings.loggedInUserId)?.savedRecipes
  .includes(recipe);
}

export default userSlice.reducer;
