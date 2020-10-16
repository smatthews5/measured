import React, { useContext } from 'react';
import { Flex, Text, Heading } from '@chakra-ui/core';
import { BoozeContext, UserContext } from '../Context';

import Header from '../components/Header';
import CardGallery from '../containers/CardGallery';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';
import RecipeDetail from '../components/RecipeDetail';

const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);

  const cocktails = booze?.cocktails;
  const userLikedDrinks = user?.likedDrinks;
  const userIngredients = user?.myIngredients;
  const w = window.innerWidth > 800;
  return (
    <>
      <Header />
      <Flex
        width="100%"
        borderTop="0.5px solid lightGray"
        direction={['column', 'column', 'row']}
      >
        <Flex
          direction="column"
          width={['100%', '100%', '70%']}
          margin="10px"
          height="75vh"
        >
          <Flex
            borderBottom="0.5px solid lightGray"
            width="100%"
            direction="column"
            height="50%"
          >
            <Heading as="h4" fontSize="20px" textDecoration="underline">
              Ingredients I Have
            </Heading>
            <CardGallery content={userIngredients} />
          </Flex>
          <Flex width="100%" direction="column" height="100%">
            <Heading
              as="h4"
              marginTop="10px"
              fontSize="20px"
              textDecoration="underline"
            >
              Drinks I&apos;ve favourited
            </Heading>
            <Flex
              direction="column"
              flexWrap="wrap"
              overflowX="scroll"
              height="100%"
            >
              {userLikedDrinks?.map((drink) => (
                <RecipeDetail cocktail={drink} key={drink.id} />
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction={['column', 'column', 'column']}
          overflowX="scroll"
          width={['100%', '100%', '30%']}
          borderLeft="0.5px solid lightGray"
          margin="10px"
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
