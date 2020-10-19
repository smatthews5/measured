import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { BoozeContext, UserContext } from '../Context';

import Header from '../components/Header';
import IngredientsGallery from '../containers/IngredientsGallery';
import BuilderSuggestionContainer from '../containers/BuilderSuggestionContainer';
import { filterCocktails } from '../utilities';
import LoadingScreen from './LoadingScreen';

const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);
  const [isLoading, toggleLoading] = useState(true);

  const cocktails = booze.cocktails;
  const userIngredients = user.myIngredients;

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        toggleLoading(false);
      }, 500);
    }
  }, []);

  const barCategories = [
    'spirit',
    'liqueur',
    'wine & vermouth',
    'fresh',
    'pantry',
  ];

  let ingredientsList: string[] = [];
  userIngredients.forEach((ingredient) =>
    ingredientsList.push(ingredient.name),
  );

  return (
    <>
      {isLoading ? (
        // <LoadingScreen />
        <Header />
      ) : (
        <>
          <Header />
          <Flex
            width="100%"
            borderTop="0.5px solid lightGray"
            direction={['column', 'column', 'column', 'row']}
            padding="2%"
            paddingRight={0}
          >
            <Flex
              width={['100%', '100%', '100%', '65%']}
              direction="column"
              overflowX="scroll"
              height="83vh"
            >
              <Heading
                as="h4"
                alignSelf="left"
                my="2vh"
                fontSize="3vw"
                letterSpacing="-0.02em"
              >
                My ingredients
              </Heading>
              {barCategories.map((category) => (
                <>
                  <Heading as="h3" fontFamily="mono" mt="1%">
                    {category}
                  </Heading>
                  <IngredientsGallery
                    ingredients={userIngredients.filter(
                      (ingredient) => ingredient.barCategory === category,
                    )}
                  />
                </>
              ))}
            </Flex>
            <Flex
              direction="column"
              width={['100%', '100%', '100%', '35%']}
              borderLeft="0.5px solid lightGray"
              overflowX="scroll"
              height="83vh"
            >
              <Heading
                as="h4"
                alignSelf="left"
                my="2vh"
                pl="6%"
                fontSize="3vw"
                letterSpacing="-0.02em"
              >
                Ready to make
              </Heading>
              <BuilderSuggestionContainer
                cocktails={
                  filterCocktails(cocktails, ingredientsList).allIngredients
                }
                selection={ingredientsList}
              />
              <Heading
                as="h4"
                alignSelf="left"
                my="2vh"
                pl="6%"
                fontSize="3vw"
                letterSpacing="-0.02em"
              >
                Missing 1 ingredient
              </Heading>
              <BuilderSuggestionContainer
                cocktails={
                  filterCocktails(cocktails, ingredientsList).missingOne
                }
                selection={ingredientsList}
              />
              <Heading
                as="h4"
                alignSelf="left"
                my="2vh"
                pl="6%"
                fontSize="3vw"
                letterSpacing="-0.02em"
              >
                Missing 2 ingredients
              </Heading>
              <BuilderSuggestionContainer
                cocktails={
                  filterCocktails(cocktails, ingredientsList).missingTwo
                }
                selection={ingredientsList}
              />
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default MyBar;
