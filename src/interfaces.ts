export interface User {
  displayName?: string;
  email?: string;
  myIngredients?: Ingredient[];
  likedDrinks?: Cocktail[];
  createdDrinks?: Cocktail[];
  photoUrl?: string;
  createdAt?: Date;
}

export interface Booze {
  ingredients: Ingredient[];
  cocktails: Cocktail[];
  categories: string[];
  bases: string[];
  glasses: string[];
}

export interface Garnish {
  name: string;
  description: string;
}

export interface IngredientDetails {
  name: string;
  amount: number;
  unit: string;
}

export interface Cocktail {
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
  id?: string;
}

export interface Ingredient {
  categories: string[];
  id: string;
  imageUrl: string;
  name: string;
  builder: string[];
  barCategory: string;
}

export interface Relevance {
  [key: string]: number;
}
