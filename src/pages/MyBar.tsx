import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/core';

import { BoozeContext, UserContext } from '../Context';
import { Ingredient } from '../interfaces';
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
  const ingredients = booze?.ingredients;

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

  let ingredientsDetail = ingredients?.filter((ingredient) =>
    userIngredients.includes(ingredient.name),
  );

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
                    key={category}
                    ingredients={
                      ingredientsDetail
                        ? ingredientsDetail.filter(
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
              {userIngredients.length === 0 ? (
                <>
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
                      filterCocktails(cocktails, userIngredients).allIngredients
                    }
                    selection={userIngredients}
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
                      filterCocktails(cocktails, userIngredients).missingOne
                    }
                    selection={userIngredients}
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
                      filterCocktails(cocktails, userIngredients).missingTwo
                    }
                    selection={userIngredients}
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
