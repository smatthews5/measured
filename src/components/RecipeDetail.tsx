import { Flex, Heading, Image, List, ListItem, Text } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { Cocktail } from '../interfaces';

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  return (
    <>
      <Flex direction="column" height="90vh">
        <Heading
          as="h2"
          fontFamily="mono"
          color="purple.400"
          mx="auto"
          fontSize={['2xl', '3xl', '5vw', '6vw']}
        >
          {cocktail?.name}
        </Heading>
        <Flex h="50vh" w="80vw" mt="5vh" mx="auto">
          <Flex w="50%" flexDirection="column" align="flex-end" mr="5%">
            <Image
              src={cocktail?.imageUrl}
              w="65%"
              h="90%"
              objectFit="cover"
              borderRadius="8px"
              boxShadow="0px 0px 9px 1px rgba(0, 0, 0, 0.75)"
            ></Image>
            <Flex
              alignSelf="flex-end"
              alignItems="center"
              width="65%"
              justifyContent="space-around"
            >
              <Text
                fontFamily="heading"
                fontSize={['md', 'lg', 'xl', '2xl']}
                w="50%"
              >
                Glass: {cocktail?.glassware}
              </Text>
              <Text
                fontFamily="heading"
                fontSize={['md', 'lg', 'xl', '2xl']}
                w="50%"
              >
                Garnish: {cocktail?.garnish.description}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" w="50%">
            <Text
              fontFamily="heading"
              mb="2%"
              fontSize={['md', 'lg', 'xl', '2xl']}
            >
              Ingredients:
            </Text>
            <List spacing={3}>
              {cocktail?.ingredients.map((ingredient) => (
                <ListItem key={ingredient.name}>
                  {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                </ListItem>
              ))}
            </List>
            <Text
              fontFamily="heading"
              my="2%"
              fontSize={['md', 'lg', 'xl', '2xl']}
            >
              Instructions:
            </Text>
            <List spacing={3}>
              {cocktail?.instructions.map((instruction) => (
                <ListItem key={instruction}>{instruction}</ListItem>
              ))}
            </List>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RecipeDetail;
