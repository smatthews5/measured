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
}

export interface Cocktail {}

export interface Ingredient {}
