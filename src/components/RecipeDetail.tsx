import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import garnish from '../assets/images/garnish2.png';
import glass from '../assets/images/glass2.png';

import { Cocktail } from '../interfaces';

const responsiveImage = ['15px', '30px', '40px', ' 50px'];

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  return (
    <>
      <Flex
        height="80vh"
        width="80vw"
        backgroundColor="rgb(240,240,240, 0.5)"
        boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
        borderRadius={20}
        margin="auto"
        mt={5}
      >
        <Flex w="50%" flexDirection="column">
          <Image
            src={cocktail?.imageUrl}
            w="85%"
            h="85%"
            mx="auto"
            my="auto"
            objectFit="cover"
            borderRadius="8px"
            boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
          ></Image>
        </Flex>
        <Flex direction="column" w="50%" h="100%" justifyContent="space-evenly">
          <Box>
            <Heading
              as="h3"
              fontWeight="200"
              color="purple.400"
              textAlign="center"
              fontSize={['xl', '2xl', '3xl', '4vw']}
            >
              {cocktail?.name}
            </Heading>
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
          </Box>
          <Box>
            <Text fontFamily="heading" fontSize={['md', 'lg', 'xl', '2xl']}>
              Method:
            </Text>
            <List spacing={3} mt="2%">
              {cocktail?.instructions.map((instruction) => (
                <ListItem key={instruction}>{instruction}</ListItem>
              ))}
            </List>
          </Box>
          <Flex w="100%" pl="5vw">
            <Flex w="50%" alignItems="center">
              <Image
                w={responsiveImage}
                h={responsiveImage}
                src={glass}
                objectFit="cover"
                alt="glassware icon"
              />
              <Text>: {cocktail?.glassware}</Text>
            </Flex>
            <Flex w="50%" alignItems="center">
              <Image
                w={responsiveImage}
                h={responsiveImage}
                src={garnish}
                objectFit="cover"
                alt="garnish icon"
              />
              <Text>
                :{' '}
                {cocktail?.garnish.description !== ''
                  ? cocktail?.garnish.description
                  : 'n/a'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RecipeDetail;
