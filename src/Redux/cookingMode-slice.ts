import { RootState } from './redux-store';
import { createSlice , PayloadAction  } from "@reduxjs/toolkit";
import Recipe from '../Interfaces/RecipeInterface';

interface cookingModeState {
  selectedRecipe: Recipe | null;
}

const initialState:cookingModeState = {
    selectedRecipe: null
};

export const cookingModeSlice = createSlice({
  name: 'cookingMode',
  initialState,
  reducers: {
    setRecipeCookingMode: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    }
  },
});
      
export const { setRecipeCookingMode } = cookingModeSlice.actions;
export const selectCookingModeRecipe = (state:RootState) => state.cookingMode.selectedRecipe;

export default cookingModeSlice.reducer;