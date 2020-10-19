import React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import { Cocktail, Ingredient } from '../interfaces';

import { Box, Heading, Flex, Grid, Image, Text } from '@chakra-ui/core';

interface IngredientsGalleryProps extends RouteComponentProps {
  ingredients: Ingredient[];
}

const IngredientsGallery: React.FC<IngredientsGalleryProps> = ({
  ingredients,
}) => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6} pr="2%" pt="1%">
      {ingredients.map((ingredient) => (
        <Flex
          w="100%"
          h="20vh"
          bg="gray.100"
          direction="column"
          borderRadius="5px"
          key={ingredient.id}
          cursor="pointer"
        >
          <Image
            src={ingredient.imageUrl}
            h="80%"
            objectFit="cover"
            borderTopRadius="5px"
          />
          <Text
            h="20%"
            alignSelf="center"
            textAlign="center"
            fontFamily="body"
            fontSize="md"
            color="purple.400"
          >
            {ingredient.name}
          </Text>
        </Flex>
      ))}
      <Box
        w="100%"
        h="20vh"
        bg="gray.100"
        borderRadius="5px"
        textAlign="center"
        verticalAlign="middle"
        lineHeight="20vh"
        fontSize="15vh"
        color="purple.400"
        fontFamily="heading"
        onClick={() => navigate('/ingredients')}
        cursor="pointer"
      >
        +
      </Box>
    </Grid>
  );
};

export default IngredientsGallery;
