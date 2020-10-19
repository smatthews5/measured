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
    myIngredients: [
      {
        categories: ['spirit', 'light'],
        id: 'GWDfGX85JIaCciOchMTt',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fvodka.jpg?alt=media&token=f71e981a-de58-42e4-967e-6ddd284b6ba9',
        name: 'vodka',
        barCategory: 'spirit',
        builder: ['core'],
      },
      {
        categories: ['whisky', 'dark'],
        id: 'PajZOGP0sybgiMtruE9x',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Frye.jpg?alt=media&token=e73d779f-2d7c-4db1-9083-df4f2a1c8289',
        name: 'rye whiskey',
        barCategory: 'spirit',
        builder: ['core'],
      },
      {
        categories: ['spirit', 'light'],
        id: 'fpqpY5FB9jZIpHOivszW',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fgin.jpg?alt=media&token=18a20ce9-362a-4672-a1a3-a0e7a37177d1',
        name: 'gin',
        barCategory: 'spirit',
        builder: ['core'],
      },
      {
        categories: ['liqueur', 'sweet'],
        id: '0MO2RgaFiPyW8QZlwwFR',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fcointreau.jpg?alt=media&token=96a1dbf5-054b-417c-9b13-ee1ce8e7071d',
        name: 'Cointreau',
        barCategory: 'liqueur',
        builder: ['balance'],
      },
      {
        categories: ['juice', 'sweet', 'fruit'],
        id: '0lG8Z0b9cXJFQZL4orfE',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fcranberry-juice.jpg?alt=media&token=5b76dfa9-8412-4392-ad2f-495595619140',
        name: 'cranberry juice',
        barCategory: 'fresh',
        builder: ['balance'],
      },
      {
        categories: ['liqueur', 'amaro', 'sweet', 'bitter', 'aperitif'],
        id: '2gNPdI6BfZOFqT8kr0tK',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Faperol.jpg?alt=media&token=306bdcd7-4bb2-424d-9fba-ae17835a5255',
        name: 'Aperol',
        barCategory: 'liqueur',
        builder: ['balance'],
      },
      {
        categories: ['wine', 'vermouth'],
        id: '4OeBUtSgXZCBQOHmlH54',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fdry-vermouth.jpg?alt=media&token=66835c53-7d6a-4d83-ac25-2b32aca9659d',
        name: 'dry vermouth',
        barCategory: 'wine & vermouth',
        builder: ['balance'],
      },
      {
        categories: ['sweetener', 'sweet'],
        id: '71DIkABHdCYgfQ6RgnEa',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fagave-syrup.jpg?alt=media&token=d32cd45e-7bcf-4363-ac45-125f03153a1c',
        name: 'agave syrup',
        barCategory: 'pantry',
        builder: ['balance'],
      },
      {
        categories: ['citrus', 'fresh', 'fruit'],
        id: '97pLWtQvRq7Eg5LPKA4r',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Forange.jpg?alt=media&token=9980a8ff-22fc-4acd-8bb6-fcb0d677ddd5',
        name: 'orange',
        barCategory: 'fresh',
        builder: ['balance'],
      },
      {
        categories: ['sweetener', 'sugar', 'sweet'],
        id: 'A0yLqnGo6Vy4M2wojjGJ',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fsimple-syrup.jpg?alt=media&token=a859c6e5-a9ac-4021-8b75-e2181ba5093e',
        name: 'simple syrup',
        barCategory: 'pantry',
        builder: ['balance'],
      },
      {
        categories: ['sparkling', 'wine'],
        id: 'HnioKP6VlNY2idTdLkoT',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fchampagne.jpg?alt=media&token=ffd5d205-a7d0-40dc-9dbf-9b08a54309b7',
        name: 'champagne',
        barCategory: 'wine & vermouth',
        builder: ['balance'],
      },
    ],
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
          <Redirect from="/search" to="/search/__" />
          <LoginSignupPage path="/welcome" />
          <AddACocktailPage path="/add" />
        </Router>
      </BoozeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
