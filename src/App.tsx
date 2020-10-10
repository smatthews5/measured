import React from 'react';
import ReactDOM from 'react-dom';
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
    <React.StrictMode>
      <Router>
        <Home path="/" />
        <Ingredients />
        <MyBar />
        <DrinkBuilder />
        <Recipe />
        <LoginSignup />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
