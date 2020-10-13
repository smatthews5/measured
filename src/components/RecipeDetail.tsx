import { Flex, Heading, Image, List, ListItem, Text } from '@chakra-ui/core';
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
        direction="column"
        height="80vh"
        width="80vw"
        backgroundColor="rgb(230,230,230, 0.5)"
        boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.2)"
        borderRadius={20}
        margin="auto"
        mt={5}
      >
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
            <Flex alignItems="center" width="60%" mt="2%">
              <Image
                w={responsiveImage}
                h={responsiveImage}
                src={glass}
                objectFit="cover"
                alt="glassware icon"
                mb={3}
                ml={10}
              />
              <Text
                fontFamily="heading"
                fontSize={['sm', 'md', 'lg', 'lg']}
                w="50%"
              >
                : {cocktail?.glassware}
              </Text>
              <Image
                w={responsiveImage}
                h={responsiveImage}
                src={garnish}
                objectFit="cover"
                alt="garnish icon"
                mb={3}
              />
              <Text
                fontFamily="heading"
                fontSize={['sm', 'md', 'lg', 'lg']}
                w="50%"
              >
                :{' '}
                {cocktail?.garnish.description !== ''
                  ? cocktail?.garnish.description
                  : 'n/a'}
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
              mt="5%"
              fontSize={['md', 'lg', 'xl', '2xl']}
            >
              Instructions:
            </Text>
            <List spacing={3} mt="2%">
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
