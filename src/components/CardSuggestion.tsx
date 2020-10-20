import React, { useContext } from 'react';
import { Flex, Image, Text, Heading } from '@chakra-ui/core';
import { Cocktail, Ingredient, Relevance } from '../interfaces';
import { UserContext } from '../Context';

const CardSuggestion: React.FC = ({ cocktails }) => {
  const { user } = useContext(UserContext);
  const userIngredients =
    user?.user.myIngredients == 'undefined' ? [] : user?.user.myIngredients;

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
    <Flex
      direction={['row', 'row', 'row', 'column']}
      height="50px"
      margin={['100px', '10px']}
    >
      {cockcock?.map((cocktail) => (
        <Flex
          key={cocktail.id}
          margin={['10px', '10px', '10px']}
          direction={['column', 'column', 'column', 'row']}
          minHeight={['100px', '13vw', '13vw']}
          minWidth={['100px', '13vw', '13vw']}
        >
          <Image
            src={cocktail.imageUrl}
            maxWidth="13vw"
            maxHeight="13vw"
            minWidth={['200px', '200px', '200px', '13vw']}
            minHeight="200px"
            borderRadius="5px"
            objectFit="cover"
          />
          <Flex direction="column" marginLeft={['0px', '0px', '0px', '10px']}>
            <Heading
              as="h4"
              isTruncated
              fontSize={['14px', '16px', '18px', '24px']}
              padding="2px"
              alignSelf={['center', 'center', 'center', 'flex-start']}
              marginLeft={['0px', '0px', '8px']}
            >
              {cocktail.name.charAt(0).toUpperCase() + cocktail.name.slice(1)}
            </Heading>
            <Flex marginTop="10px" direction="column">
              <Text color="gray.600" fontSize={['0px', '0px', '0px', '20px']}>
                Ingredients:
              </Text>
              {cocktail.ingredients.map((ingredient, index: number) => (
                <Text
                  color="gray.400"
                  key={ingredient.name}
                  fontSize={['0px', '0px', '0px', '18px']}
                  isTruncated
                >
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
