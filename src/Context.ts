import { createContext } from 'react';
import { Ingredient, Cocktail } from './interfaces';

interface Drink {
  booze: {
    ingredients: Ingredient[];
    cocktails: Cocktail[];
  };
}
const UserContext = createContext({});

const BoozeContext = createContext<Partial<Drink>>({});

export { UserContext, BoozeContext };
