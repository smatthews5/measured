import React from 'react';
import { Flex, Image, Text, Heading } from '@chakra-ui/core';
import { Cocktail, Ingredient, Relevance } from '../interfaces';
import { RouteComponentProps } from '@reach/router';
import BuilderSuggestion from '../components/BuilderSuggestion';

interface BuilderSuggestionContainerProps extends RouteComponentProps {
  cocktails: Cocktail[];
  selection: string[];
}

const BuilderSuggestionContainer: React.FC<BuilderSuggestionContainerProps> = ({
  cocktails,
  selection,
}) => {
  return (
    <Flex direction="column" px="6%" mt="2%">
      {cocktails.map((cocktail) => (
        <BuilderSuggestion
          cocktail={cocktail}
          selection={selection}
          key={cocktail.id}
        />
      ))}
    </Flex>
  );
};

export default BuilderSuggestionContainer;
