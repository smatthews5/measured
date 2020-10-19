import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext, UserContext } from '../Context';
import { navigate } from '@reach/router';
import { filterCocktails } from '../utilities';
import { Cocktail, Ingredient } from '../interfaces';

import LoadingScreen from './LoadingScreen';
import Header from '../components/Header';
import IngredientsGallery from '../containers/IngredientsGallery';
import BuilderSuggestionContainer from '../containers/BuilderSuggestionContainer';
import { Box, Flex, Heading, Text, Divider } from '@chakra-ui/core';

const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);
  const [isLoading, toggleLoading] = useState(true);

  const [ready, setReady] = useState<Cocktail[]>([]);
  const [oneMore, setOneMore] = useState<Cocktail[]>([]);
  const [twoMore, setTwoMore] = useState<Cocktail[]>([]);
  const [ingredientsDetail, setIngredientsDetail] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (!user) navigate('/welcome');
    if (user) {
      if (isLoading) {
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      }
      setIngredientsDetail(
        booze?.ingredients.filter((ingredient) =>
          user.myIngredients.includes(ingredient.name),
        ),
      );
      setReady(
        filterCocktails(booze?.cocktails, user.myIngredients).allIngredients,
      );
      setOneMore(
        filterCocktails(booze?.cocktails, user.myIngredients).missingOne,
      );
      setTwoMore(
        filterCocktails(booze?.cocktails, user.myIngredients).missingTwo,
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
      ) : (
        <>
          <div id="fixed">
            <Header />
            <Divider />
          </div>
          <div id="scroll">
            <Flex
              width="100%"
              borderTop="0.5px solid lightGray"
              direction={['column', 'column', 'column', 'row']}
              padding="2%"
              paddingRight={0}
            >
              <Flex
                width={['100%', '100%', '100%', '60%']}
                direction="column"
                overflowX="scroll"
                height="83vh"
              >
                <Heading
                  as="h4"
                  alignSelf="left"
                  mt="1vh"
                  mb="3vh"
                  fontSize={['lg', 'xl', '2xl', '3vw']}
                  letterSpacing="-0.02em"
                >
                  What&apos;s in my bar?
                </Heading>
                <hr />
                {barCategories.map((category) => (
                  <Box key={category} mb="2vh">
                    <Heading
                      as="h4"
                      alignSelf="left"
                      mt="2vh"
                      fontSize={['md', 'lg', 'xl', '2xl']}
                      letterSpacing="-0.02em"
                      textTransform="uppercase"
                    >
                      {category}
                    </Heading>
                    <IngredientsGallery
                      key={category}
                      ingredients={
                        ingredientsDetail
                          ? ingredientsDetail.filter(
                              (ingredient) =>
                                ingredient.barCategory === category,
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
                borderLeft="0.5px solid lightGray"
                overflowX="scroll"
                height="83vh"
                px={4}
              >
                <Flex
                  direction="row"
                  align="flex-start"
                  justify="space-between"
                >
                  <Heading
                    as="h4"
                    mt="1vh"
                    mb="3vh"
                    fontSize={['lg', 'xl', '2xl', '3vw']}
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
                      color="gray.400"
                      pt={2}
                    >
                      See drinks I&apos;ve favourited &rarr;
                    </Heading>
                  </Box>
                </Flex>
                <hr />
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
                          my="2vh"
                          fontSize={['md', 'lg', 'xl', '2xl']}
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
                          my="2vh"
                          fontSize={['md', 'lg', 'xl', '2xl']}
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
                          my="2vh"
                          fontSize={['md', 'lg', 'xl', '2xl']}
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
      )}
    </>
  );
};

export default MyBar;
