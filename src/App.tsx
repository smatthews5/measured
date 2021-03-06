/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from 'react';
import { Router, RouteComponentProps, Redirect } from '@reach/router';
import { UserContext, BoozeContext } from './Context';
import { Booze, User, Cocktail, Ingredient } from './interfaces';

import * as CocktailService from './services/firebase';
import { getUniqueOptions, shuffleOrder } from './utilities';

// import full-screen pages
import Home from './pages/Home';
import About from './pages/About';
import Ingredients from './pages/Ingredients';
import MyBar from './pages/MyBar';
import TopShelf from './pages/TopShelf';
import DrinkBuilder from './pages/DrinkBuilder';
import Recipe from './pages/Recipe';
import SearchResults from './pages/SearchResults';
import SignUp from './pages/SignUp';
import AddACocktail from './pages/AddACocktail';

// set up page prop-types for routing
const HomePage = (props: RouteComponentProps) => <Home />;
const AboutPage = (props: RouteComponentProps) => <About />;
const IngredientsPage = (props: RouteComponentProps) => <Ingredients />;
const MyBarPage = (props: RouteComponentProps) => <MyBar />;
const TopShelfPage = (props: RouteComponentProps) => <TopShelf />;
const DrinkBuilderPage = (props: RouteComponentProps) => <DrinkBuilder />;
const RecipePage = (props: RouteComponentProps) => <Recipe />;
const SearchResultsPage = (props: RouteComponentProps) => <SearchResults />;
const SignUpPage = (props: RouteComponentProps) => <SignUp />;
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

  useEffect(() => {
    CocktailService.getIngredients()
      .then((allIngredients: Ingredient[]) =>
        setBooze((prevState) => ({
          ...prevState,
          ingredients: allIngredients,
        })),
      )
      .catch((error) =>
        console.error('---> error getting all ingredients', error),
      );
    CocktailService.getCocktails()
      .then((allCocktails: Cocktail[]) => {
        setBooze((prevState) => ({
          ...prevState,
          cocktails: shuffleOrder(allCocktails),
        }));
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
      .catch((error) =>
        console.error('---> error getting all cocktails', error),
      );

    CocktailService.auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const user = await CocktailService.createUserProfileDocument(userAuth, {
          displayName: '',
        });
        setUser(user);
      } else {
        setUser(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <BoozeContext.Provider value={currentBooze}>
        <Router>
          <HomePage path="/" />
          <AboutPage path="/about" />
          <IngredientsPage path="/ingredients" />
          <MyBarPage path="/my-bar" />
          <TopShelfPage path="/top-shelf" />
          <DrinkBuilderPage path="/build-a-drink" />
          <RecipePage path="/recipes/:name" />
          <SearchResultsPage path="/search/:query" />
          <Redirect from="/search" to="/search/__" />
          <SignUpPage path="/welcome" />
          <AddACocktailPage path="/add" />
        </Router>
      </BoozeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
