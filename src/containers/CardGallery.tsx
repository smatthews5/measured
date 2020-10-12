import React from 'react';
import { Flex } from '@chakra-ui/core';
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
