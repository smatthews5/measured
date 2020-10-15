import React from 'react';
import { RouteComponentProps } from '@reach/router';

import Card from '../components/Card';
import { Cocktail } from '../interfaces';

import { Box, Heading, Flex } from '@chakra-ui/core';
import { GiNuclearPlant } from 'react-icons/gi';

interface CardGalleryProps extends RouteComponentProps {
  cocktails: Cocktail[];
  categoryHeading: string;
}

const CardGallery: React.FC<CardGalleryProps> = ({
  cocktails,
  categoryHeading,
}) => {
  let boxWidth;
  cocktails.hasOwnProperty('base') ? boxWidth = '82vw' : boxWidth= '100%';
  return (

    <>
      <Box w={boxWidth} mx="auto" my="2.5vh">
        <Heading
          as="h3"
          fontWeight="normal"
          letterSpacing="0.02em"
          color="purple.400"
          pl="1vw"
          py={2}
          fontSize={['xl', '2xl', '3xl', '4xl']}
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
