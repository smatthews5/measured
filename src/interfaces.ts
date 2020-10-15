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
  glasses: string[];
}

export interface Garnish {
  id: string;
  description: string;
}

export interface IngredientDetails {
  name: string;
  amount: number;
  unit: string;
}

export interface Cocktail {
  id: string;
  name: string;
  base: string;
  imageUrl: string;
  glassware: string;
  categories: string[];
  ingredients: IngredientDetails[];
  ingredientsList: string[];
  garnish: Garnish;
  instructions: string[];
  relevance?: number;
}

export interface Ingredient {
  categories: string[];
  id: string;
  imageUrl: string;
  name: string;
  builder: string[];
}

export interface Relevance {
  [key: string]: number;
}
