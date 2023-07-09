import { cookingModeSlice } from './cookingMode-slice';
import { configureStore } from "@reduxjs/toolkit";
import localStorageMiddleware from "../LocalStorage/localStorageMiddleware";
import recipesReducer from "./recipes-slice";
import userSettingsReducer from "./userSettings-slice";
import cookingModeReducer from "./cookingMode-slice";
const persistedState = localStorage.getItem('appState')
  ? JSON.parse(localStorage.getItem('appState') as string)
  : {};

const store = configureStore({
  reducer: {
    userSettings: userSettingsReducer,
    recipes:recipesReducer,
    cookingMode: cookingModeReducer
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
