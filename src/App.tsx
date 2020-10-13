/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { UserContext, BoozeContext } from './Context';
import * as CocktailService from './services/firebase';
import { Booze, User, Cocktail, Ingredient } from './interfaces';

// import full-screen pages
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import MyBar from './pages/MyBar';
import DrinkBuilder from './pages/DrinkBuilder';
import Recipe from './pages/Recipe';
import LoginSignup from './pages/LoginSignup';

// set up page prop-types for routing
const HomePage = (props: RouteComponentProps) => <Home />;
const IngredientsPage = (props: RouteComponentProps) => <Ingredients />;
const MyBarPage = (props: RouteComponentProps) => <MyBar />;
const DrinkBuilderPage = (props: RouteComponentProps) => <DrinkBuilder />;
const RecipePage = (props: RouteComponentProps) => <Recipe />;
const LoginSignupPage = (props: RouteComponentProps) => <LoginSignup />;

// TODO: Prune out the 'any' types and repalce with approppriate cocktail/ingredient interfaces in a separate file

const App: React.FC = () => {
  // define initial state for user details
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    myIngredients: [],
    likedDrinks: [],
    createdDrinks: [],
  });

  // define initial state for drink/ingredient details
  const [booze, setBooze] = useState<Booze>({
    ingredients: [],
    cocktails: [],
    categories: [],
    bases: [],
  });

  // memoize state --> trigger updates with changes from any page
  const currentUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const currentBooze = useMemo(() => ({ booze, setBooze }), [booze, setBooze]);

  useEffect(() => {
    CocktailService.getCocktails()
      .then((allCocktails: Cocktail[]) => {
        setBooze((prevState) => ({ ...prevState, cocktails: allCocktails }));
        return allCocktails;
      })
      .then((allCocktails) => {
        const categories = allCocktails.reduce(
          (acc: string[], cocktail: Cocktail) => [
            ...acc,
            ...cocktail.categories,
          ],
          [],
        );
        const setCocktails = new Set(categories);
        const uniqueCategories = Array.from(setCocktails);
        const allBases = allCocktails.reduce(
          (acc: string[], cocktail: Cocktail) => [...acc, cocktail.base],
          [],
        );
        setBooze((prevState) => ({
          ...prevState,
          bases: allBases,
          categories: uniqueCategories,
        }));
      })
      .catch((error) => console.log('---> error getting all cocktails', error));
    CocktailService.getIngredients()
      .then((allIngredients: Ingredient[]) =>
        setBooze((prevState) => ({
          ...prevState,
          ingredients: allIngredients,
        })),
      )
      .catch((error) =>
        console.log('---> error getting all ingredients', error),
      );
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <BoozeContext.Provider value={currentBooze}>
        <Router>
          <HomePage path="/" />
          <IngredientsPage path="/ingredients" />
          <MyBarPage path="/my-bar" />
          <DrinkBuilderPage path="/build-a-drink" />
          <RecipePage path="/recipes/:name" />
          <LoginSignupPage path="/welcome" />
        </Router>
      </BoozeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
