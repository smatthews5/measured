/* eslint-disable no-console */
import React, { useState, useMemo, useEffect, Component } from 'react';
import { Router, RouteComponentProps, Redirect } from '@reach/router';
import { UserContext, BoozeContext } from './Context';
import { Booze, User, Cocktail, Ingredient } from './interfaces';

import * as CocktailService from './services/firebase';
import { getUniqueOptions } from './utilities';

// import full-screen pages
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import MyBar from './pages/MyBar';
import DrinkBuilder from './pages/DrinkBuilder';
import Recipe from './pages/Recipe';
import SearchResults from './pages/SearchResults';
import LoginSignup from './pages/LoginSignup';
import AddACocktail from './pages/AddACocktail';

// set up page prop-types for routing
const HomePage = (props: RouteComponentProps) => <Home />;
const IngredientsPage = (props: RouteComponentProps) => <Ingredients />;
const MyBarPage = (props: RouteComponentProps) => <MyBar />;
const DrinkBuilderPage = (props: RouteComponentProps) => <DrinkBuilder />;
const RecipePage = (props: RouteComponentProps) => <Recipe />;
const SearchResultsPage = (props: RouteComponentProps) => <SearchResults />;
const LoginSignupPage = (props: RouteComponentProps) => <LoginSignup />;
const AddACocktailPage = (props: RouteComponentProps) => <AddACocktail />;

const App: React.FC = () => {
  // define initial state for user details
  const [user, setUser] = useState<User>();

  // define initial state for drink/ingredient details
  const [booze, setBooze] = useState<Booze>({
    ingredients: [],
    cocktails: [],
    categories: [],
    bases: [],
    glasses: [],
  });

  // memoize state --> trigger updates with changes from any page
  const currentUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const currentBooze = useMemo(() => ({ booze, setBooze }), [booze, setBooze]);

  let unsubscribeFromAuth = null;
  useEffect(() => {
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
    CocktailService.getCocktails()
      .then((allCocktails: Cocktail[]) => {
        setBooze((prevState) => ({ ...prevState, cocktails: allCocktails }));
        return allCocktails;
      })
      .then((allCocktails) => {
        const allCategories = getUniqueOptions(allCocktails, 'categories');
        const allBases = getUniqueOptions(allCocktails, 'base');
        const allGlasses = getUniqueOptions(allCocktails, 'glassware');
        setBooze((prevState) => ({
          ...prevState,
          bases: allBases,
          categories: allCategories,
          glasses: allGlasses,
        }));
      })
      .catch((error) => console.log('---> error getting all cocktails', error));

    unsubscribeFromAuth = CocktailService.auth.onAuthStateChanged(
      async (userAuth) => {
        const user = await CocktailService.createUserProfileDocument(userAuth);
        setUser({ user });
      },
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
          <SearchResultsPage path="/search/:query" />
          <Redirect from="/search" to="/search/__" />
          <LoginSignupPage path="/welcome" />
          <AddACocktailPage path="/add" />
        </Router>
      </BoozeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
