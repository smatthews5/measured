import React from 'react';
import { Router } from '@reach/router';

// import full-screen pages
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import MyBar from './pages/MyBar';
import DrinkBuilder from './pages/DrinkBuilder';
import Recipe from './pages/Recipe';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Ingredients />
      <MyBar />
      <DrinkBuilder />
      <Recipe />
      <LoginSignup />
    </Router>
  );
};

export default App;
