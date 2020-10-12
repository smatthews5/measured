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

export interface Cocktail {
  base: string,
  categories: string[],
  garnish: string,
  id: string,
  imageUrl: string,
  ingredients: Ingredient[],
  ingredientsList: string[],
  instructions: [{[key: number]: string}],
  name: string,
}

export interface Ingredient {
  categories: string[],
  id: string,
  imageUrl: string,
  name: string,
}