import React, { useState, useMemo, useEffect } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { UserContext } from './UserContext';
import * as CocktailService from './services/firebase';

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

const App: React.FC = () => {
  // define initial state for user details
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    myIngredients: [],
    likedDrinks: [],
    createdDrinks: [],
  });
  // memoize user state --> trigger updates with changes from any page
  const updatedUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [cocktails, setCocktails] = useState([]);
  
  useEffect(() => {
    CocktailService.getCocktails().then((cocktailsData) => setCocktails(cocktailsData));
  }, []);

  return (
    <UserContext.Provider value={updatedUser}>
      <Router>
        <HomePage path="/" />
        <IngredientsPage path="/ingredients" />
        <MyBarPage path="/my-bar" />
        <DrinkBuilderPage path="/build-a-drink" />
        <RecipePage path="/recipes/:name" />
        <LoginSignupPage path="/welcome" />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
