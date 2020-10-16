import React from 'react';
import { RouteComponentProps } from '@reach/router';

import Card from '../components/Card';
import { Cocktail, Ingredient } from '../interfaces';

import { Box, Heading, Flex } from '@chakra-ui/core';

interface CardGalleryProps extends RouteComponentProps {
  content: Cocktail[] | Ingredient[];
  categoryHeading: string;
}

const CardGallery: React.FC<CardGalleryProps> = ({
  content,
  categoryHeading,
}) => {

  // content[0].hasOwnProperty('base') ? '82vw' : '100%'; NEED TO FIX FOR MYBAR PAGE


  let boxWidth;
  const urlLocation = location.pathname == '/'; 
  urlLocation ? (boxWidth = '82vw') : (boxWidth = '100%');

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
          {content.map((object: Cocktail | Ingredient) => (
            <Card content={object} key={object.id} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
