import React, { useContext } from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { Cocktail, Ingredient, Relevance } from '../interfaces';
import { UserContext } from '../Context';

const CardSuggestion: React.FC = ({ cocktails }) => {
  const { user } = useContext(UserContext);
  const userIngredients = user?.myIngredients;

  const userIngredientsNames = userIngredients?.map(
    (ingredient) => ingredient.name,
  );
  const cocks: Cocktail[] = [];
  for (let i = 0; i < cocktails.length; i++) {
    for (let j = 0; j < cocktails[i].ingredients.length; j++) {
      for (let c = 0; c < userIngredients.length; c++) {
        if (userIngredientsNames[c] === cocktails[i].ingredients[j].name) {
          cocks.push(cocktails[i]);
        }
      }
    }
  }
  const rankResults = (allMatches: Cocktail[]) => {
    try {
      const relevance: Relevance = {};
      const uniqueCocktails: Cocktail[] = [];
      allMatches.forEach((cocktail) => {
        if (relevance[cocktail.id]) {
          relevance[cocktail.id]++;
        } else {
          relevance[cocktail.id] = 1;
          uniqueCocktails.push(cocktail);
        }
      });
      const rankedCocktails = uniqueCocktails
        .map((cocktail) => ({
          ...cocktail,
          relevance: relevance[cocktail.id],
        }))
        .sort((a, b) => b.relevance - a.relevance);
      return rankedCocktails;
    } catch (error) {
      console.log('---> error ranking and removing duplicates', error);
    }
  };
  const cockcock = rankResults(cocks);

  return (
    <Flex direction={['row', 'row', 'column']}>
      {cockcock?.map((cocktail, index: number) => (
        <Flex key={index} margin="10px" direction={['column', 'column', 'row']}>
          <Image src={cocktail.imageUrl} minWidth="13vw" width='13vw' maxHeight='13vw' borderRadius="5px" />
          <Flex direction="column" marginLeft="10px">
            <Text>
              {cocktail.name.charAt(0).toUpperCase() + cocktail.name.slice(1)}
            </Text>
            <Flex marginTop="10px" direction="column">
              <Text fontSize={['0px','12px']}>Ingredients:</Text>
              {cocktail.ingredients.map(
                (ingredient, index: number) => (
                  <Text key={index} fontSize={['0px','8px']}>
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
