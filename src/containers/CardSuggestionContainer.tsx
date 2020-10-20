import React from 'react';
import { Flex } from '@chakra-ui/core';

import CardSuggestion from '../components/CardSuggestion';
import { Cocktail } from '../interfaces';

import { RouteComponentProps } from '@reach/router';

interface CardSuggestionContainerProps extends RouteComponentProps {
  cocktails: Cocktail[];
}

const CardSuggestionContainer: React.FC<CardSuggestionContainerProps> = ({
  cocktails,
}) => {
  return (
    <Flex overflowX="scroll" height="75vh">
      <CardSuggestion cocktails={cocktails} />
    </Flex>
  );
};

export default CardSuggestionContainer;
