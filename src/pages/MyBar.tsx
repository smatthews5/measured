import React, { useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import { BoozeContext, UserContext } from '../Context';

import Header from '../components/Header';
import CardGallery from '../containers/CardGallery';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';
import FavouritedDrinks from '../components/FavouritedDrinks';

const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);

  const cocktails = booze?.cocktails;
  const userLikedDrinks = user?.likedDrinks;
  const userIngredients = user?.myIngredients;

  return (
    <>
      <Header />
      <Flex
        width="100%"
        borderTop="0.5px solid lightGray"
        direction={['column', 'column','column', 'row']}
        marginLeft='20px'
      >
        <Flex
          direction="column"
          width={['100%', '100%', '100%', '70%']}
          margin="10px"
          height="75vh"
        >
          <Flex
            width="100%"
            direction="column"
            height="80%"
          >
            <Heading as="h4" textDecoration="underline">
              Ingredients I Have
            </Heading>
            <CardGallery content={userIngredients} />
          </Flex>
          <Flex width="100%" direction="column" height="100%">
            <Heading as="h4" marginTop="10px" textDecoration="underline">
              Favourites
            </Heading>
            <Flex overflow="scroll" align="center" justify="center">
              <Flex width="100%" overflow="scroll">
                {userLikedDrinks?.map((drink, index) => (
                  <Flex key={index} margin="10px">
                    <FavouritedDrinks cocktail={drink} key={drink.id} />
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction='column'
          overflowX="scroll"
          width={['100%', '100%', '100%']}
          borderLeft='0.5px solid lightGray'
          marginTop={['0px','30px',"80px", '10px']}
        >
          <Heading
            as="h4"
            margin="10px"
            alignSelf={['left', 'left', 'left', 'center']}
            textDecoration="underline"
          >
            Ready to Make
          </Heading>
          <CardSuggestionContainer cocktails={cocktails} />
        </Flex>
      </Flex>
    </>
  );
};

export default MyBar;
