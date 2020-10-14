import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/core';
import { BoozeContext } from '../Context';

import { Cocktail } from '../interfaces';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import CardGallery from '../containers/CardGallery';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';
import RecipeDeatil from '../components/RecipeDetail';
import CardSuggestion from '../components/CardSuggestion';

const MyBar: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const cocktails = booze?.cocktails;
  const ingredients = booze?.ingredients;
/*
build a new component for the ingredients to be like framer - just an image and name
drinks ive favourited to also be a new component showing image name ingredients and steps on a card like the recipe page
drinks ready to make image and name setup in the cardSuggestionContainer .. click on and take to recipe page??? 
*/
  return (
    <>
      <Header />
      <Flex width="100%" border="1px solid red">
        <Flex direction="column" width="75%" border="1px solid red">
          <Flex border="0.5px solid lightGray" width="100%">
            Ingredients I Have
          </Flex>
          <CardDetailList ingredients={ingredients} />
          <Flex>Drinks I've Favourited</Flex>
            <RecipeDeatil cocktails={cocktails.cocktail} />
        </Flex>
        <Flex direction="column" alignItems="center">
          <Flex margin="20px">Ready to Make</Flex>
          <Flex direction="column" margin="20px">
          <CardSuggestionContainer cocktails={cocktails}/>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default MyBar;
