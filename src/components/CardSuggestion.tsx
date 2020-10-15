import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { Ingredient, Cocktail } from '../interfaces';

import { RouteComponentProps } from '@reach/router';

interface CardSuggestionProps extends RouteComponentProps {
  cocktails: Cocktail[];
}

const CardSuggestion: React.FC<CardSuggestionProps> = ({ cocktails }) => {
  /*
  pull into here a lst of ingredients we have, as well as the cocktails
  add functionality where we filter ready to make by what ingredients we have
  only list first 5..
  filter by amount of ingredients you have
*/
  return (
    <Flex direction="column">
      {cocktails.map((cocktail, index: number) => (
        <Flex key={index} margin="10px">
          <Image src={cocktail.imageUrl} width="13vw" borderRadius="5px" />
          <Flex direction="column" marginLeft="10px">
            <Text>
              {cocktail.name.charAt(0).toUpperCase() + cocktail.name.slice(1)}
            </Text>
            <Flex marginTop="10px" direction="column">
              <Text fontSize="12px">Ingredients:</Text>
              {cocktail.ingredients.map((ingredient, index) => (
                <Text key={index} fontSize="8px">
                  {ingredient.name}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CardSuggestion;
