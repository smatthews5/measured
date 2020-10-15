import React from 'react';

import { Flex, Image, Heading } from '@chakra-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';

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
      mr={2}
      ml={2}
      mt={5}
      mb={2}
    >
      <Image
        fit="cover"
        borderRadius="5px"
        boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.5)"
        src={cocktail.imageUrl}
        alt={cocktail.name}
        w="18vw"
        h="18vw"
        overflow="hidden"
        onClick={() => navigate(`/recipes/${cocktail.name}`)}
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
          {cocktail.hasOwnProperty('base') ? cocktail.base.toLowerCase() : null}
          {cocktail.categories.map((category) => `—${category}`)}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Card;
