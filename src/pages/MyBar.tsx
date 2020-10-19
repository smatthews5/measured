import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/core';

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
      }, 1500);
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
  if (userIngredients) {
    userIngredients.forEach((ingredient) =>
      ingredientsList.push(ingredient.name),
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
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
                mt="2vh"
                mb="3vh"
                fontSize="3vw"
                letterSpacing="-0.02em"
              >
                My bar
              </Heading>
              {barCategories.map((category) => (
                <Box key={category}>
                  <Heading as="h3" fontFamily="mono" mt="1%">
                    {category}
                  </Heading>
                  <IngredientsGallery
                    ingredients={
                      userIngredients
                        ? userIngredients.filter(
                            (ingredient) => ingredient.barCategory === category,
                          )
                        : []
                    }
                  />
                </Box>
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
                mt="2vh"
                mb="3vh"
                pl="6%"
                fontSize="3vw"
                letterSpacing="-0.02em"
              >
                What can I make?
              </Heading>
              {ingredientsList.length === 0 ? (
                <>
                  <Text as="h4" px="6%" fontSize="2xl">
                    &larr; Add any ingredients you have to your{' '}
                    <span id="title">Measured</span> bar.
                  </Text>
                  <br />
                  <Text as="h4" px="6%" fontSize="lg">
                    We&apos;ll let you know which cocktails you can make with
                    ingredients you already have, or with just a few more.
                  </Text>
                </>
              ) : (
                <>
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
                    With one more ingredient
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
                    With two more ingredients
                  </Heading>
                  <BuilderSuggestionContainer
                    cocktails={
                      filterCocktails(cocktails, ingredientsList).missingTwo
                    }
                    selection={ingredientsList}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default MyBar;
