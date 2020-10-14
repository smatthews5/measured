import React from 'react';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';

const DrinkBuilder: React.FC = () => {
  return (
    <>
      <Header />
      <>
        <CocktailShaker />
        <CardSuggestionContainer />
      </>
    </>
  );
}

export default DrinkBuilder;
