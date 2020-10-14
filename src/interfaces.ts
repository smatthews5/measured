export interface User {
  firstName: string;
  lastName: string;
  myIngredients: Ingredient[];
  likedDrinks: Cocktail[];
  createdDrinks: Cocktail[];
}

export interface Booze {
  ingredients: Ingredient[];
  cocktails: Cocktail[];
  categories: string[];
  bases: string[];
  search: {
    query: string[];
    results: Cocktail[];
  };
}

export interface Cocktail {
  base: string;
  categories: string[];
  garnish: {
    id: string;
    description: string;
  };
  glassware: string;
  id: string;
  imageUrl: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  ingredientsList: string[];
  instructions: string[];
  name: string;
}

export interface Ingredient {
  categories: string[];
  id: string;
  imageUrl: string;
  name: string;
}
