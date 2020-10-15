import React from 'react';
import { Flex } from '@chakra-ui/core';

import CardSuggestion from '../components/CardSuggestion';

const CardSuggestionContainer: React.FC = ({ cocktails }) => {
  return (
    <Flex margin='10px'>
      <CardSuggestion cocktails={cocktails} />
    </Flex>
  );
};

export default CardSuggestionContainer;
