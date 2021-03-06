import React from 'react';
import { Flex, Image, Heading, Tag, TagLabel } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';
import { navigate, RouteComponentProps } from '@reach/router';
import loading from '../assets/images/loading.png';

interface BuilderSuggestionProps extends RouteComponentProps {
  cocktail: Cocktail;
  selection: string[];
}

const BuilderSuggestion: React.FC<BuilderSuggestionProps> = ({
  cocktail,
  selection,
}) => {
  const onBuilder = location.pathname === '/build-a-drink';

  return (
    <Flex
      mx={onBuilder ? 4 : 0}
      my={onBuilder ? 4 : 2}
      w="95%"
      h="20vh"
      minHeight="150px"
      onClick={() =>
        // eslint-disable-next-line no-prototype-builtins
        cocktail.hasOwnProperty('base')
          ? navigate(`/recipes/${cocktail.name}`)
          : null
      }
      backgroundColor="rgb(240,240,240, 0.5)"
      borderRadius="5px"
    >
      <Image
        src={cocktail.imageUrl}
        fallbackSrc={loading}
        objectFit="cover"
        h="100%"
        w={['30vw', '30vw', '30vw', '15vw']}
        borderRadius="5px"
      />
      <Flex direction="column" justifyContent="space-between" pl={4}>
        <Heading
          fontSize={['4xl', '3xl', '3xl', '2.5vw']}
          fontFamily="mono"
          as="h3"
          color="purple.400"
          py={2}
        >
          {cocktail.name}
        </Heading>
        <Flex flexWrap="wrap" pb="5px" overflow="hidden">
          {cocktail.ingredientsList.map((ingredient) => (
            <Tag
              variant="subtle"
              fontWeight="600"
              fontFamily="mono"
              letterSpacing="0.02em"
              fontSize={['0.75em', '1em', '1.25em', '1.25em']}
              size="lg"
              key={ingredient}
              bgColor={
                selection.includes(ingredient) ? 'purple.200' : 'gray.100'
              }
              color={selection.includes(ingredient) ? 'purple.400' : 'gray.600'}
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
