import React, { useContext, useEffect, useState } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/core';

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
                    key={category}
                    ingredients={
                      ingredientsDetail
                        ? ingredientsDetail.filter(
                            (ingredient) => ingredient.barCategory === category,
                          )
                        : []
                    }
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
                What can I make?
              </Heading>
              {userIngredients.length === 0 ? (
                <Text as="h4" px="6%" fontSize="2xl">
                  Add ingredients to your bar to see what cocktials you can make
                  with what you have
                </Text>
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
                    Missing 1 ingredient
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
                    Missing 2 ingredients
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
