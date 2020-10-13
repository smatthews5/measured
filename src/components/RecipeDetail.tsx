import { Flex, Heading } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { Cocktail } from '../interfaces';

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  return (
    <>
      <Flex direction="column">
        <Heading as="h2" fontFamily="mono" color="purple.400" mx="auto" fontSize={['2xl', '3xl', '5vw', '6vw']}>
          {cocktail?.name}
        </Heading>
      </Flex>
    </>
  );
}

export default RecipeDetail;
