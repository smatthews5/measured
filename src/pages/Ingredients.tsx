import React, { useContext } from 'react';
import { BoozeContext } from '../Context';

import { Box, Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import Search from '../components/Search';
import CardDetailList from '../containers/CardDetailList';

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
        <Search existingSearch={''} />
        <CardDetailList ingredients={ingredients} />
      </div>
    </>
  );
};

export default Ingredients;
