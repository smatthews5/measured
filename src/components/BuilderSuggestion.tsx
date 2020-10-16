import React from 'react';
import {
  Flex,
  Image,
  Text,
  Heading,
  HStack,
  Tag,
  TagLabel,
} from '@chakra-ui/core';
import { Cocktail, Ingredient, Relevance } from '../interfaces';
import { navigate, RouteComponentProps } from '@reach/router';

interface BuilderSuggestionProps extends RouteComponentProps {
  cocktail: Cocktail;
}

const BuilderSuggestion: React.FC<BuilderSuggestionProps> = ({ cocktail }) => {
  return (
    <Flex
      mb="3%"
      h="18vh"
      onClick={() =>
        cocktail.hasOwnProperty('base')
          ? navigate(`/recipes/${cocktail.name}`)
          : null
      }
      backgroundColor="rgb(240,240,240, 0.5)"
      borderRadius="5px"
    >
      <Image
        src={cocktail.imageUrl}
        objectFit="cover"
        h="100%"
        w="18vw"
        borderRadius="5px"
      />
      <Flex direction="column" justifyContent="space-between" pl="2vw">
        <Heading
          fontSize="3vw"
          fontFamily="mono"
          as="h3"
          color="purple.400"
          py="2%"
        >
          {cocktail.name}
        </Heading>
        <Flex flexWrap="wrap">
          {cocktail.ingredientsList.map((ingredient) => (
            <Tag
              size="md"
              key={ingredient}
              variant="subtle"
              bgColor="purple.200"
              color="purple.400"
              fontFamily="body"
              textTransform="capitalize"
              fontSize="sm"
              mr="5px"
              mb="5px"
            >
              <TagLabel>{ingredient}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BuilderSuggestion;
