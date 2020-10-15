import React, { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/core';
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
        <Flex direction="column" width={['100%','100%',"70%"]} margin="10px" height="75vh">
          <Flex
            borderBottom="0.5px solid lightGray"
            width="100%"
            direction="column"
            height="50%"
          >
            <Text>Ingredients I Have</Text>
            <CardGallery content={userIngredients} />
          </Flex>
          <Flex width="100%" direction="column" height="100%">
            <Text padding="10px">Drinks I&apos;ve favourited</Text>
            <Flex
              direction="column"
              flexWrap="wrap"
              overflowY="scroll"
              height="100%"
            >
              {userLikedDrinks?.map((drink) => (
                <RecipeDetail cocktail={drink} key={drink} />
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
          <Text margin="10px" alignSelf={['left', 'left', 'left','center']}>
            Ready to Make
          </Text>
          <CardSuggestionContainer cocktails={cocktails} />
        </Flex>
      </Flex>
    </>
  );
};

export default MyBar;
