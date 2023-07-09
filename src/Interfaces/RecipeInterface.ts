interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: { ingredient: string }[];
    instructions: string;
    rating: number[];
    averageRating:number;
    time: number;
    category: string;
    favorite?: boolean;
  }

  export default Recipe;