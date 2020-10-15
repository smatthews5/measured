import React from 'react';
import { Flex } from '@chakra-ui/core';

import CardSuggestion from '../components/CardSuggestion';

const CardSuggestionContainer: React.FC = ({ cocktails }) => {
  return (
    <Flex overflowX='scroll' height='75vh'>
      <CardSuggestion cocktails={cocktails} />
    </Flex>
  );
};

export default CardSuggestionContainer;
