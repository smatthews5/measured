import React, { useContext } from 'react';
import { BoozeContext } from '../Context';

import { Box, Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import IngredientSearch from '../components/IngredientSearch';

const Ingredients: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const ingredients = booze.ingredients;

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <IngredientSearch />
        <CardDetailList ingredients={ingredients} />
      </div>
    </>
  );
};

export default Ingredients;
