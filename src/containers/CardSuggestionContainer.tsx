import React from 'react';
import { Flex } from '@chakra-ui/core';


import CardSuggestion from '../components/CardSuggestion';

const CardSuggestionContainer: React.FC = ({cocktails}) => {
  return <CardSuggestion cocktails={cocktails}/>;
};

export default CardSuggestionContainer;
