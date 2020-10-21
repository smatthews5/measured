import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext, UserContext } from '../Context';
import { navigate } from '@reach/router';
import { filterCocktails } from '../utilities';
import { Cocktail, Ingredient } from '../interfaces';

import LoadingScreen from './CocktailLoadingScreen';
import Header from '../components/Header';
import IngredientsGallery from '../containers/IngredientsGallery';
import BuilderSuggestionContainer from '../containers/BuilderSuggestionContainer';
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider
} from '@chakra-ui/core';

// import loadingWhite from '../assets/images/loadingWhite.png';
const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);
  const [isLoading, toggleLoading] = useState(true);

  const [ready, setReady] = useState<Cocktail[]>([]);
  const [oneMore, setOneMore] = useState<Cocktail[]>([]);
  const [twoMore, setTwoMore] = useState<Cocktail[]>([]);
  const [ingredientsDetail, setIngredientsDetail] = useState<Ingredient[]>([]);

  const responsiveLargeText = ['4xl', '4xl', '4xl', '3vw'];
  const responsiveMedText = ['3xl', '2xl', '2xl', '3xl'];

  //TODO: Responsiveness ---> make the What can I make section an accordion/drawer in small screens

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        toggleLoading(false);
      }, 1500);
    }

    if (user && booze) {
      setIngredientsDetail(
        booze.ingredients.filter((ingredient) =>
          user.myIngredients.includes(ingredient.name),
        ),
      );
      setReady(
        filterCocktails(booze.cocktails, user.myIngredients).allIngredients,
      );
      setOneMore(
        filterCocktails(booze.cocktails, user.myIngredients).missingOne,
      );
      setTwoMore(
        filterCocktails(booze.cocktails, user.myIngredients).missingTwo,
      );
    }
  }, [user]);

  const barCategories = [
    'spirit',
    'liqueur',
    'wine & vermouth',
    'fresh',
    'pantry',
  ];

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : null}
      <>
        <div id="fixed">
          <Header />
          <Divider />
        </div>
        <div id="scroll">
          <Flex
            width="100%"
            height="100%"
            borderTop="0.5px solid gray.300"
            direction={['column', 'column', 'column', 'row']}
            pl={4}
            pr={0}
            pt={6}
          >
            <Flex
              width={['100%', '100%', '100%', '60%']}
              direction="column"
              overflowX="scroll"
              height="100%"
              pl={4}
            >
              <Heading
                as="h4"
                height="15vh"
                alignSelf="left"
                my="2.5vh"
                fontSize={responsiveLargeText}
                letterSpacing="-0.02em"
              >
                What&apos;s in my bar?
              </Heading>
              <hr id="wide" />
              {barCategories.map((category) => (
                <Box key={category} mb="2vh">
                  <Heading
                    as="h4"
                    alignSelf="left"
                    mt="2vh"
                    fontSize={responsiveMedText}
                    letterSpacing="-0.02em"
                    textTransform="uppercase"
                  >
                    {category}
                  </Heading>
                  <IngredientsGallery
                    category={category}
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
              width={['100%', '100%', '100%', '40%']}
              borderLeft={['none', 'none', 'none', '0.5px solid gray.300']}
              borderTop={[
                '0.5px solid gray.300',
                '0.5px solid gray.300',
                '0.5px solid gray.300',
                'none',
              ]}
              pt={['6', '6', '6', '0']}
              overflowX="scroll"
              height="100%"
              px={4}
            >
              <Flex
                direction="row"
                align="flex-end"
                justify="space-between"
                height="15vh"
              >
                <Heading
                  as="h4"
                  my="2.5vh"
                  fontSize={responsiveLargeText}
                  letterSpacing="-0.02em"
                >
                  What can I make?
                </Heading>
                <Box
                  width="30%"
                  cursor="pointer"
                  onClick={() => navigate('/top-shelf')}
                >
                  <Heading
                    as="h3"
                    fontSize={['sm', 'sm', 'md', 'md']}
                    color="gray.600"
                    py={2}
                    textAlign="right"
                  >
                    See drinks I&apos;ve favourited &rarr;
                  </Heading>
                </Box>
              </Flex>
              <hr id="wide" />
              {user && !user.myIngredients.length ? (
                <>
                  <Text as="h4" pr={4} fontSize="2xl">
                    &larr; Add any ingredients you have to your{' '}
                    <span id="title">Measured</span> bar.
                  </Text>
                  <br />
                  <Text as="h4" pr={4} fontSize="lg">
                    We&apos;ll let you know which cocktails you can make with
                    ingredients you already have, or with just a few more.
                  </Text>
                </>
              ) : (
                <>
                  {ready.length ? (
                    <>
                      <Heading
                        as="h4"
                        alignSelf="left"
                        mt="2vh"
                        fontSize={responsiveMedText}
                        letterSpacing="-0.02em"
                        textTransform="uppercase"
                      >
                        Ready to make
                      </Heading>
                      <BuilderSuggestionContainer
                        cocktails={ready}
                        selection={user ? user.myIngredients : []}
                      />
                    </>
                  ) : null}
                  {oneMore.length ? (
                    <>
                      <Heading
                        as="h4"
                        alignSelf="left"
                        mt="2vh"
                        fontSize={responsiveMedText}
                        letterSpacing="-0.02em"
                        textTransform="uppercase"
                      >
                        With one more ingredient
                      </Heading>
                      <BuilderSuggestionContainer
                        cocktails={oneMore}
                        selection={user ? user.myIngredients : []}
                      />
                    </>
                  ) : null}
                  {twoMore.length ? (
                    <>
                      <Heading
                        as="h4"
                        alignSelf="left"
                        mt="2vh"
                        fontSize={responsiveMedText}
                        letterSpacing="-0.02em"
                        textTransform="uppercase"
                      >
                        With two more ingredients
                      </Heading>
                      <BuilderSuggestionContainer
                        cocktails={twoMore}
                        selection={user ? user.myIngredients : []}
                      />
                    </>
                  ) : null}
                </>
              )}
            </Flex>
          </Flex>
        </div>
      </>
    </>
  );
};

export default MyBar;
