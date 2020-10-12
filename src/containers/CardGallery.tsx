import React from 'react';
import { css, jsx } from '@emotion/core';

import Card from '../components/Card';
import { Box, Flex, Text } from '@chakra-ui/core';

const CardGallery: React.FC = () => {
  return (
    <>
      <Box w="82vw" mx="auto">
        <Text pl="2vw" fontSize="lg">All Cocktails</Text>
        <Flex overflowX="auto" flexWrap="nowrap" mt="2vh" mb="5vh">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
