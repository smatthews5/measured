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
      <Box w="82vw" mx="auto" mt="2vh">
        <Heading as="h3" fontFamily="mono" color="purple.400" pl="2vw">
          {categoryHeading}
        </Heading>
        <Flex overflowX="scroll">
          {cocktails.map((cocktail: Cocktail) => (
            <Card cocktail={cocktail} key={cocktail.id} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
