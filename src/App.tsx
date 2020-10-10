import React, { useState, useMemo } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { UserContext } from './UserContext';

// import full-screen pages
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import MyBar from './pages/MyBar';
import DrinkBuilder from './pages/DrinkBuilder';
import Recipe from './pages/Recipe';
import LoginSignup from './pages/LoginSignup';

const HomePage = (props: RouteComponentProps) => <Home />;
const IngredientsPage = (props: RouteComponentProps) => <Ingredients />;
const MyBarPage = (props: RouteComponentProps) => <MyBar />;
const DrinkBuilderPage = (props: RouteComponentProps) => <DrinkBuilder />;
const RecipePage = (props: RouteComponentProps) => <Recipe />;
const LoginSignupPage = (props: RouteComponentProps) => <LoginSignup />;

const App: React.FC = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    myIngredients: [],
    likedDrinks: [],
    createdDrinks: [],
  });
  const updatedUser = useMemo(() => ({ user, setUser }), [user, setUser]);

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
