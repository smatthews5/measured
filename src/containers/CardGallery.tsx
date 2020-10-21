import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';

import Card from '../components/Card';
import { Cocktail } from '../interfaces';
import { Box, Heading, Flex } from '@chakra-ui/core';

interface CardGalleryProps extends RouteComponentProps {
  content: Cocktail[];
  categoryHeading: string;
}

const CardGallery: React.FC<CardGalleryProps> = ({
  content,
  categoryHeading,
}) => {
  let boxWidth;
  const urlLocation = location.pathname == '/';
  urlLocation ? (boxWidth = '82vw') : (boxWidth = '100%');

  return (
    <>
      <Box w={boxWidth} mx="auto" my="2.5vh">
        <Box
          cursor="pointer"
          onClick={
            categoryHeading === 'top shelf — my favourites'
              ? () => navigate('/top-shelf')
              : () => false
          }
        >
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
        </Box>
        <Flex overflowX="scroll" mx="1%" mb={2}>
          {content.map((object: Cocktail) => (
            <Card content={object} key={object.id} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
