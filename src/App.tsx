import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router';

// import full-screen pages
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import MyBar from './pages/MyBar';
import DrinkBuilder from './pages/DrinkBuilder';
import Recipe from './pages/Recipe';
import LoginSignup from './pages/LoginSignup';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router>
        <Home path="/"/>
        <Ingredients path="/ingredients"/>
        <MyBar path="/myBar"/>
        <DrinkBuilder path="/drinkBuilder"/>
        <Recipe path="/recipe"/>
        <LoginSignup path="/loginSignup"/>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
const RouterPage = (
  // eslint-disable-next-line no-undef
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;
