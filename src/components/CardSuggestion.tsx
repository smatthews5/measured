import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { Ingredient } from '../interfaces';

const CardSuggestion: React.FC = ({ cocktails }) => {
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
            <Text>{cocktail.name}</Text>
            <Flex marginTop='10px' direction='column'>
              {cocktail.ingredients.map(
                (ingredient: Ingredient, index: number) => (
                  <Text key={index} fontSize="8px">
                    {ingredient.name}
                  </Text>
                ),
              )}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CardSuggestion;
