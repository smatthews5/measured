import React from 'react';
import { css, jsx } from '@emotion/core';

import Card from '../components/Card';
import { Flex } from '@chakra-ui/core';

const CardGallery: React.FC = () => {
  return (
    <>
      <Flex px="9%" overflowX="scroll">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Flex>
    </>
  );
};

export default CardGallery;
