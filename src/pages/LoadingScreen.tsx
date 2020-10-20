import React from 'react';

import Lottie from 'react-lottie';
import martini from '../assets/animations/martini.json';
const martiniAnimation = {
  loop: false,
  autoplay: true,
  animationData: martini,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
import { Heading, Flex } from '@chakra-ui/core';

function LoadingScreen() {
  return (
    <Flex
      align="center"
      justify="center"
      width="100vw"
      height="100vh"
      direction="column"
    >
      <Lottie options={martiniAnimation} height={250} width={250} />
      <Heading as="h3" color="purple.400" fontSize="6xl">
        Loading
      </Heading>
    </Flex>
  );
}

export default LoadingScreen;
