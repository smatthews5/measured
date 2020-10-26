import React from 'react';
import Lottie from 'react-lottie';
import martini from '../assets/animations/Martini.json';

const martiniAnimation = {
  loop: false,
  autoplay: true,
  animationData: martini,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

import { Heading, Flex } from '@chakra-ui/core';

const MartiniLoadingScreen: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      py={8}
      width="100vw"
      height="100vh"
      minHeight="100vh"
      direction="column"
    >
      <Lottie options={martiniAnimation} height={250} width={250} />
      <Heading as="h3" color="purple.400" fontSize="6xl">
        Loading
      </Heading>
    </Flex>
  );
};

export default MartiniLoadingScreen;
