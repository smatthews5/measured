/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from 'react';
import { Router, RouteComponentProps, Redirect } from '@reach/router';
import { UserContext, BoozeContext } from './Context';
import * as CocktailService from './services/firebase';
import { Booze, User, Cocktail, Ingredient, Garnish } from './interfaces';

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

const getUniqueOptions = (allCocktails: Cocktail[], property: string) => {
  // TODO: FIX TYPESCRIPT ERRORS => May need to adjust the Cocktail interface
  const allValues = allCocktails.reduce((acc: string[], cocktail: Cocktail) => {
    if (typeof cocktail[property] === 'object')
      return [...acc, ...cocktail[property]];
    else return [...acc, cocktail[property]];
  }, []);
  const uniqueValues = new Set(allValues);
  const sortedValues = Array.from(uniqueValues).sort((a, b) =>
    a > b ? 1 : -1,
  );
  return sortedValues;
};

const App: React.FC = () => {
  // define initial state for user details
  const [user, setUser] = useState<User>({
    firstName: 'JillStephenChris',
    lastName: 'MastersMatthewsPerry',
    myIngredients: [],
    likedDrinks: [
      {
        base: 'bourbon',
        categories: ['refreshing', 'old-school'],
        garnish: {
          description: 'mint leaves or sprigs',
          id: 'I3WfOCqGU8pDE9eWEoLE',
        },
        glassware: 'cup',
        ingredients: [
          { amount: 2.5, name: 'bourbon', unit: 'oz' },
          { amount: 0.5, name: 'simple syrup', unit: 'oz' },
          { unit: 'leaves', amount: 8, name: 'mint' },
          { name: 'crushed ice', unit: 'cup', amount: 1 },
        ],
        ingredientsList: [
          'cct8d5PjZqoC2XwHtTpy',
          'A0yLqnGo6Vy4M2wojjGJ',
          'I3WfOCqGU8pDE9eWEoLE',
        ],
        instructions: [
          'in a cold cup or glass, crush the mint leaves into the simple syrup',
          'add bourbon',
          'stir in half the crushed ice',
          'top with the remaining ice',
          'garnish with more mint',
        ],
        name: 'mint julep',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fmint-julep.jpg?alt=media&token=acb01027-4eda-422c-ba32-7190b8faad9f',
        id: '0jCpYE2sLeojirdxPAwg',
      },
      {
        base: 'bourbon',
        categories: ['refreshing', 'old-school'],
        garnish: {
          description: 'mint leaves or sprigs',
          id: 'I3WfOCqGU8pDE9eWEoLE',
        },
        glassware: 'cup',
        ingredients: [
          { amount: 2.5, name: 'bourbon', unit: 'oz' },
          { amount: 0.5, name: 'simple syrup', unit: 'oz' },
          { unit: 'leaves', amount: 8, name: 'mint' },
          { name: 'crushed ice', unit: 'cup', amount: 1 },
        ],
        ingredientsList: [
          'cct8d5PjZqoC2XwHtTpy',
          'A0yLqnGo6Vy4M2wojjGJ',
          'I3WfOCqGU8pDE9eWEoLE',
        ],
        instructions: [
          'in a cold cup or glass, crush the mint leaves into the simple syrup',
          'add bourbon',
          'stir in half the crushed ice',
          'top with the remaining ice',
          'garnish with more mint',
        ],
        name: 'mint julep',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fmint-julep.jpg?alt=media&token=acb01027-4eda-422c-ba32-7190b8faad9f',
        id: '0jCpYE2sLeojirdxPAwg',
      },
      {
        base: 'bourbon',
        categories: ['refreshing', 'old-school'],
        garnish: {
          description: 'mint leaves or sprigs',
          id: 'I3WfOCqGU8pDE9eWEoLE',
        },
        glassware: 'cup',
        ingredients: [
          { amount: 2.5, name: 'bourbon', unit: 'oz' },
          { amount: 0.5, name: 'simple syrup', unit: 'oz' },
          { unit: 'leaves', amount: 8, name: 'mint' },
          { name: 'crushed ice', unit: 'cup', amount: 1 },
        ],
        ingredientsList: [
          'cct8d5PjZqoC2XwHtTpy',
          'A0yLqnGo6Vy4M2wojjGJ',
          'I3WfOCqGU8pDE9eWEoLE',
        ],
        instructions: [
          'in a cold cup or glass, crush the mint leaves into the simple syrup',
          'add bourbon',
          'stir in half the crushed ice',
          'top with the remaining ice',
          'garnish with more mint',
        ],
        name: 'mint julep',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fmint-julep.jpg?alt=media&token=acb01027-4eda-422c-ba32-7190b8faad9f',
        id: '0jCpYE2sLeojirdxPAwg',
      },
      {
        base: 'bourbon',
        categories: ['refreshing', 'old-school'],
        garnish: {
          description: 'mint leaves or sprigs',
          id: 'I3WfOCqGU8pDE9eWEoLE',
        },
        glassware: 'cup',
        ingredients: [
          { amount: 2.5, name: 'bourbon', unit: 'oz' },
          { amount: 0.5, name: 'simple syrup', unit: 'oz' },
          { unit: 'leaves', amount: 8, name: 'mint' },
          { name: 'crushed ice', unit: 'cup', amount: 1 },
        ],
        ingredientsList: [
          'cct8d5PjZqoC2XwHtTpy',
          'A0yLqnGo6Vy4M2wojjGJ',
          'I3WfOCqGU8pDE9eWEoLE',
        ],
        instructions: [
          'in a cold cup or glass, crush the mint leaves into the simple syrup',
          'add bourbon',
          'stir in half the crushed ice',
          'top with the remaining ice',
          'garnish with more mint',
        ],
        name: 'mint julep',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fmint-julep.jpg?alt=media&token=acb01027-4eda-422c-ba32-7190b8faad9f',
        id: '0jCpYE2sLeojirdxPAwg',
      },
    ],
    createdDrinks: [],
  });

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
          <Redirect from="/search" to="/search/all" />
          <LoginSignupPage path="/welcome" />
          <AddACocktailPage path="/add" />
        </Router>
      </BoozeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
