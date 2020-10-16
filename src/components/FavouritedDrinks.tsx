import React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import garnish from '../assets/images/garnish.png';
import glass from '../assets/images/glass.png';

import { Cocktail } from '../interfaces';

import { IconButton, Flex, Heading, Image, Text } from '@chakra-ui/core';
import { CloseIcon } from '@chakra-ui/icons';
interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const FavouritedDrinks: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  // dumb-ass function but no use-case as yet for a more complex formula
  const calculateFraction = (num: number) => {
    const fractionString = num.toString();
    let [integer, decimal] = fractionString.split('.');
    integer === '0' ? (integer = '') : (integer = integer + ' ');
    if (decimal === '25') decimal = '¼';
    else if (decimal === '5') decimal = '½';
    else if (decimal === '75') decimal = '¾';
    return integer + decimal;
  };

  return (
    <Flex
      width={['300px', '300px', '600px', '600px']}
      height="370px"
      borderRadius="8px"
      bgColor="gray.200"
      backgroundColor="rgb(240,240,240, 0.5)"
      onClick={() => navigate(`/recipes/${cocktail.name}`)}
    >
      <Flex direction="row" justify="space-around">
        <Flex padding="10px" direction="column" align="center">
          <Image
            src={cocktail?.imageUrl}
            width='300px'
            height="300px"
            borderRadius="6px"
          />
          <Heading as="h4" margin="10px">
            {cocktail?.name.charAt(0).toUpperCase() + cocktail.name.slice(1)}
          </Heading>
        </Flex>

        <Flex padding="10px" direction="column" width={['0%','0%','50%']}>
          <Flex justify="space-between">
            <Heading as="h4" fontSize={['0px', '0px', '32px', '32px']}>
              Ingredients
            </Heading>
          </Flex>
          <Flex marginTop="10px" direction="column">
            {cocktail?.ingredients.map((ingredient, index) => (
              <Text
                color="gray.600"
                key={index}
                fontSize={['0px', '0px', '16px', '16px']}
              >
                {ingredient.amount}oz - {ingredient.name}
              </Text>
            ))}
          </Flex>
          <Flex align="center">
            <IconButton
              margin="10px"
              width="20px"
              aria-label="delete"
              icon={<CloseIcon />}
              colorScheme="gray"
              variant="solid"
            />
            <Text fontSize={['0px', '0px', '16px', '16px']}>Remove</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default FavouritedDrinks;
