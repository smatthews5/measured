import { Heading } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { Cocktail } from '../interfaces';

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  return (
    <>
      <Heading as="h2" fontFamily="mono" color="purple.400" pl="2vw">
        {cocktail?.name}
      </Heading>
    </>
  );
};

export default RecipeDetail;
