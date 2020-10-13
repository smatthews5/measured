import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { FaCocktail } from 'react-icons/fa';

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
        <Flex h="50vh" mt="5vh">
          <Flex w="50vw">
            <Image
              src={cocktail?.imageUrl}
              w="70%"
              h="80%"
              mx="auto"
              borderRadius="8px"
              boxShadow="0px 0px 9px 1px rgba(0, 0, 0, 0.75)"
            ></Image>
          </Flex>
          <Flex direction="column" w="50vw">
            <Text>Ingredients:</Text>
            <List spacing={3}>
              {cocktail?.ingredients.map((ingredient) => (
                <ListItem>
                  {/* <ListIcon as={FaCocktail} color="purple.500" size="5px" /> */}
                  {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                </ListItem>
              ))}
            </List>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RecipeDetail;
