import React from 'react';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';

const DrinkBuilder: React.FC = () => {
  return (
    <>
      <Header />
      <Divider />;
      <>
        <CocktailShaker />
        <CardSuggestionContainer />
      </>
    </>
  );
};

export default DrinkBuilder;
