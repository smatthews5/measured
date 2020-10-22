import React from 'react';
import { Flex, Image, Heading } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import loadingWhite from '../assets/images/loadingWhite.png';

interface CoreRecipeProps extends RouteComponentProps {
  recipe: {
    name: string;
    core: string;
    balance: string;
    seasoning: string;
    imageUrl: string;
  };
  index: number;
}

const CoreRecipe: React.FC<CoreRecipeProps> = ({ recipe, index }) => {
  const responsiveFontSize = ['2xl', '2xl', '3xl', '3xl'];
  return (
    <Flex direction="column" align="center" width="90%">
      <Heading color="purple.400" fontSize={responsiveFontSize} py={2}>
        Formula #{index + 1}: The {recipe.name}
      </Heading>
      <Image
        src={recipe.imageUrl}
        fallbackSrc={loadingWhite}
        w="70%"
        minWidth="300px"
        minHeight="300px"
        maxHeight="300px"
        objectFit="cover"
        borderRadius="2px"
      />
    </Flex>
  );
};

export default CoreRecipe;
