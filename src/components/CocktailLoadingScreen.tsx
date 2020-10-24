import React from 'react';

import Lottie from 'react-lottie';
import cocktail from '../assets/animations/Cocktail.json';

const cocktailAnimation = {
  loop: false,
  autoplay: true,
  animationData: cocktail,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
import { Heading, Flex } from '@chakra-ui/core';

const CocktailLoadingScreen: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      width="100vw"
      height="100vh"
      direction="column"
    >
      <Lottie options={cocktailAnimation} height={250} width={250} />
      <Heading as="h3" color="purple.400" fontSize="6xl">
        Loading
      </Heading>
    </Flex>
  );
};

export default CocktailLoadingScreen;
