import React from 'react';
import { Flex, Image, Heading, Box } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';

import { Cocktail } from '../interfaces';

interface CardProps extends RouteComponentProps {
  cocktail: Cocktail;
}

const Card: React.FC<CardProps> = ({ cocktail }) => {
  return (
    <Flex
      direction="column"
      width="25%"
      minWidth="25%"
      borderRadius="6px"
      mr={8}
      ml={2}
      mt={5}
      mb={2}
    >
      <Image
        fit="cover"
        borderRadius="2px"
        boxShadow="0px 0px 2px 0 gray"
        src={cocktail.imageUrl}
        alt={cocktail.name}
        w="20vw"
        h="20vw"
        overflow="hidden"
      />
      <Flex
        direction="column"
        align="flex-start"
        justify="flex-start"
        padding="2px"
        pt="4%"
      >
        <Heading as="h4" fontWeight="200" fontSize={['md', 'lg', 'xl', '2xl']}>
          {cocktail.name}
        </Heading>
        <hr />
        <Heading as="h5" fontSize={['0px', '0px', 'sm', 'md']} fontWeight="200">
          {cocktail.base.toLowerCase()}
          {cocktail.categories.map((category) => `—${category}`)}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Card;
