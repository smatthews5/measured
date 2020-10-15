import React from 'react';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';
import { Box, Divider, Flex } from '@chakra-ui/core';

const DrinkBuilder: React.FC = () => {
  return (
    <>
      <Header />
      <Divider />
      <Flex>
        <Box width="50vw">
          <CocktailShaker />
        </Box>
        <Box width="50vw">
          <CardSuggestionContainer />
        </Box>
      </Flex>
    </>
  );
};

export default DrinkBuilder;
