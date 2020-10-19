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

<<<<<<< HEAD
  const cocktails = booze?.cocktails;
  // const userLikedDrinks = user?.user == 'undefined' ? null : user?.user.likedDrinks;
  // const userIngredients = user?.user == 'undefined' ? null : user?.user.myIngredients;
=======
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
>>>>>>> b157162e19b5860ef131e1e9ef992933f37ce000

  return (
    <>
      {isLoading ? (
        // <LoadingScreen />
        <Header />
<<<<<<< HEAD
        <Divider />
      </div>
      <div id="scroll">
        <Flex
          width="100%"
          borderTop="0.5px solid lightGray"
          direction={['column', 'column', 'column', 'row']}
          marginLeft="20px"
        >
          <Flex
            direction="column"
            width={['100%', '100%', '100%', '70%']}
            margin="10px"
            height="75vh"
          >
            <Flex width="100%" direction="column" height="80%">
              <Heading as="h4" textDecoration="underline">
                Ingredients I Have
              </Heading>
              <CardGallery content={user?.user.myIngredients} />
            </Flex>
            <Flex width="100%" direction="column" height="100%">
              <Heading as="h4" marginTop="10px" textDecoration="underline">
                Favourites
              </Heading>
              <Flex overflow="scroll" align="center" justify="center">
                <Flex width="100%" overflow="scroll">
                  {user?.user.likedDrinks?.map((drink, index) => (
                    <Flex key={index} margin="10px">
                      <FavouritedDrinks cocktail={drink} key={drink.id} />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              overflowX="scroll"
              width={['100%', '100%', '100%']}
              borderLeft="0.5px solid lightGray"
              marginTop={['0px', '30px', '80px', '10px']}
            >
              <Heading as="h4" margin="10px">
                <Heading
                  as="h4"
                  margin="10px"
                  alignSelf={['left', 'left', 'left', 'center']}
                  textDecoration="underline"
                >
                  Ready to Make
                </Heading>
                <CardSuggestionContainer cocktails={cocktails} />
              </Heading>
=======
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
>>>>>>> b157162e19b5860ef131e1e9ef992933f37ce000
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default MyBar;
