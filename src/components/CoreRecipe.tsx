import React from 'react';
import { Flex, Image, Heading } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';

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
  return (
    <Flex direction="column" alignItems="center" mx="2%" width="15vw">
      <Heading>Core Recipe #{index + 1}</Heading>
      <Image
        src={recipe.imageUrl}
        minHeight="20vh"
        minWidth="30vh"
        maxHeight="20vh"
        maxWidth="30vh"
        height="20vh"
        width="30vh"
        objectFit="cover"
        borderRadius="5px"
      />
      <Heading>{recipe.name}</Heading>
    </Flex>
  );
};

export default CoreRecipe;
