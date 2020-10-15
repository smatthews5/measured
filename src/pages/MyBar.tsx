import React, { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { BoozeContext, UserContext } from '../Context';

import { Cocktail } from '../interfaces';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import CardGallery from '../containers/CardGallery';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';
import RecipeDetail from '../components/RecipeDetail';
import CardSuggestion from '../components/CardSuggestion';

const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);

  const cocktails = booze?.cocktails;
  const ingredients = booze?.ingredients;
  const userLikedDrinks = user?.likedDrinks;

  /*
build a new component for the ingredients to be like framer - just an image and name
drinks ive favourited to also be a new component showing image name ingredients and steps on a card like the recipe page
drinks ready to make image and name setup in the cardSuggestionContainer.. click on and take to recipe page???
cardSuggestion to have filter method based on what ingredients you have.. Cocktails containing the most of your ingredients shown first.. 
a limited number of cocktails shown 
*/
  return (
    <>
      <Header />
      <Flex width="100%" borderTop="0.5px solid lightGray">
        <Flex direction="column" width="70%" margin="10px" height="75vh">
          <Flex
            borderBottom="0.5px solid lightGray"
            width="100%"
            direction="column"
            height="50%"
          >
            <Text>Ingredients I Have</Text>
            <CardGallery cocktails={ingredients} />
          </Flex>
          <Flex width='100%' direction="column" height="100%">
            <Text padding="10px">Drinks I've Favourited</Text>
            <Flex direction='row' overflowX='scroll'>
              {userLikedDrinks?.map((drink) => (
                <RecipeDetail cocktail={drink} />
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          width="100%"
          borderLeft="0.5px solid lightGray"
          margin="10px"
        >
          <Text margin="10px" alignSelf="center">
            Ready to Make
          </Text>
          <CardSuggestionContainer cocktails={cocktails} />
        </Flex>
      </Flex>
    </>
  );
};

export default MyBar;
