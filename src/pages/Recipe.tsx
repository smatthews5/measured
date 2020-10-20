import React, { useContext } from 'react';
import { BoozeContext } from '../Context';

import Header from '../components/Header';
import RecipeDetail from '../components/RecipeDetail';
import { useParams } from '@reach/router';
import { Divider } from '@chakra-ui/core';

const Recipe: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const params = useParams();

  const cocktail = booze?.cocktails.filter(
    (cocktail) => cocktail.name === params.name,
  )[0];

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <RecipeDetail cocktail={cocktail} />
      </div>
    </>
  );
};

export default Recipe;
