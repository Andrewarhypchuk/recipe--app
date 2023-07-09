import { RootState } from './redux-store';
import { createSlice , PayloadAction  } from "@reduxjs/toolkit";

const initialState = {
  recipes: [
    {
      id: '1',
      category: 'Pizza',
      title: 'Pizza',
      description: `The Margherita pizza is a classic Italian creation that
   showcases the simplicity of flavors. It starts with a thin and crispy pizza 
   crust as the base. `,
      instructions: `PAY ATTENTION TO HOW INGREDIENTS ARE LISTED`,
      ingredients: [
        { ingredient: 'Pizza sauce' },
        { ingredient: 'Cheese' },
        { ingredient: 'Toppings' },
        { ingredient: 'Anchovies' },
        { ingredient: 'Ripe tomatoes' },
        { ingredient: 'Pizza dough' },
        { ingredient: 'Olive oil' },
      ],
      rating: [5],
      averageRating:5,
      time: 45,
    },
    {
      id: '2',
      category: 'Meats',
      title: `Hamburger`,
      description: `A hamburger, or simply burger, is a food consisting of fillings—usually 
  a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. 
  Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or 
  chilis;`,
       instructions: `PAY ATTENTION TO HOW INGREDIENTS ARE LISTED`,
      ingredients: [
        { ingredient: 'Lettuce' },
        { ingredient: 'Tomato' },
        { ingredient: 'Onion' },
        { ingredient: 'Pickles' },
        { ingredient: 'Ketchup' },
        { ingredient: 'Mustard' },
        { ingredient: 'Mayonnaise' },
        { ingredient: 'Relish' },

      ],
      rating: [2],
      averageRating:2,
      time: 20,
    },
    {
      id: '3',
      category: 'Sushi',
      title: 'Sushi',
      description: `Sushi is a traditional dish of Japanese cuisine made with vinegared
   or salted rice as the base, combined with a variety of toppings or fillings, 
   predominantly seafood but also including meat, vegetables, seaweed, 
   mushrooms, or eggs.`,
      instructions: `PAY ATTENTION TO HOW INGREDIENTS ARE LISTED`,
      ingredients: [
        { ingredient: 'rice' },
        { ingredient: 'meat' },
        { ingredient: 'vegetables' },
        { ingredient: 'seaweed' },
        { ingredient: 'mushrooms' },
        { ingredient: 'eggs' }
      ],
      rating: [5],
      averageRating:5,
      time: 30,
    },
    {
      id: '4',
      category: 'Soup',
      title: 'Borscht',
      description: `Borscht is a hot, seasoned soup made primarily 
    from beetroots, which gives it its 
    characteristic red color.
    Borscht ingredients may include 
    beef, pork, salo (fatback), 
    beetroots, cabbage, carrots, celeriac, onions, potatoes, mushrooms, 
    tomato paste, parsley, chives, dill, bay leaves, 
    and black pepper.
   `,
      instructions: `PAY ATTENTION TO HOW INGREDIENTS ARE LISTED`,
      ingredients: [
        { ingredient: 'beef' },
        { ingredient: 'cabbage' },
        { ingredient: 'carrots' },
        { ingredient: 'celeriac' },
        { ingredient: 'potatoes' },
        { ingredient: 'salo (fatback)' },
        { ingredient: 'mushrooms' },
      ],
      rating: [4],
      averageRating:4,
      time: 90,
    },
    {
      id:'5',
      category: 'BBQ and Grilling',
      title: 'Baked potatoes in the oven',
      description: `There are potato dishes that do not require a lot of time to prepare,
    but are very tasty and healthy. These include baked potatoes in the oven. 
    Classic recipes can be supplemented with any ingredients, preparing a new dish 
    every day`,
      instructions: `PAY ATTENTION TO HOW INGREDIENTS ARE LISTED`,
      ingredients: [
        { ingredient: 'potato' },
        { ingredient: 'oil' },
      ],
      rating: [1],
      averageRating:1,
      time: 30,

    },
    {
      id: '6',
      category: 'BBQ and Grilling',
      title: 'Baked potatoes in the oven with meat',
      description: `There are potato dishes that do not require a lot of time to prepare,
      but are very tasty and healthy. These include baked potatoes in the oven. 
      Classic recipes can be supplemented with any ingredients, preparing a new dish 
      every day`,
      instructions: `PAY ATTENTION TO HOW INGREDIENTS ARE LISTED`,
      ingredients: [
        { ingredient: 'potato' },
        { ingredient: 'oil' },
        { ingredient: 'meat' },
      ],
      rating: [5],
      averageRating:5,
      time: 30,

    }],
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    rateRecipe: (state, action: PayloadAction<{ recipeId: string; rating: number }>) => {
      const { recipeId, rating } = action.payload;
      const recipe = state.recipes.find(recipe => recipe.id === recipeId);
      if (recipe) {
        recipe.rating.push(rating);
        const totalRating = recipe.rating.reduce((sum, rating) => sum + rating, 0);
        const averageRating = totalRating / recipe.rating.length;
        const roundedAverageRating = Math.round(averageRating);
        recipe.averageRating = roundedAverageRating;
       
      }
    }
  },
});
      
export const { rateRecipe } = recipesSlice.actions;
export const selectAllRecipes = (state:RootState) => state.recipes.recipes;

export default recipesSlice.reducer;