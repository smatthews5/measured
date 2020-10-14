import React from 'react';
import { RouteComponentProps } from '@reach/router';

import Card from '../components/Card';
import { Cocktail } from '../interfaces';

import { Box, Heading, Flex } from '@chakra-ui/core';

interface CardGalleryProps extends RouteComponentProps {
  cocktails: Cocktail[];
  categoryHeading: string;
}

const CardGallery: React.FC<CardGalleryProps> = ({
  cocktails,
  categoryHeading,
}) => {
  return (
    <>
      <Box w="82vw" mx="auto" my="1.5vh">
        <Heading
          as="h3"
          fontFamily="mono"
          fontWeight="normal"
          color="purple.400"
          pl="1vw"
          fontSize={['2xl', '3xl', '4xl', '5xl']}
        >
          {categoryHeading}
        </Heading>
        <Flex overflowX="scroll" mx="1%" mb={2}>
          {cocktails.map((cocktail: Cocktail) => (
            <Card cocktail={cocktail} key={cocktail.id} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
