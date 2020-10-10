import React from 'react';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';

function DrinkBuilder() {
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
