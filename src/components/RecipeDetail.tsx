import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { Flex, Heading, Image, List, ListItem, Text } from '@chakra-ui/core';
import garnish from '../assets/images/garnish.png';
import glass from '../assets/images/glass.png';

import { Cocktail } from '../interfaces';

const responsiveImage = ['10px', '20px', '35px', ' 40px'];

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  // dumb-ass function but no use-case as yet for a more complex formula
  const calculateFraction = (num: number) => {
    const fractionString = num.toString();
    let [integer, decimal] = fractionString.split('.');
    integer === '0' ? (integer = '') : (integer = integer + ' ');
    if (decimal === '25') return integer + '¼';
    else if (decimal === '5') return integer + '½';
    else if (decimal === '75') return integer + '¾';
    else return num;
  };

  return (
    <Flex
      height="70vh"
      width="80vw"
      backgroundColor="gray.100"
      border="solid 1px"
      borderColor="purple.400"
      borderRadius={6}
      m="auto"
      mt="8vh"
      wrap="wrap"
      overflowY="scroll"
    >
      <Flex
        w="40%"
        minWidth="300px"
        flexDirection="column"
        mx="auto"
        my="auto"
        justify="center"
        align="center"
      >
        <Heading
          as="h3"
          fontFamily="mono"
          color="purple.400"
          textAlign="center"
          mb={4}
          fontSize={['4xl', '5xl', '6xl', '7xl']}
        >
          {cocktail?.name}
        </Heading>
        <Image
          src={cocktail?.imageUrl}
          w={['90%', '90%', '25vw']}
          h={['90%', '90%', '25vw']}
          objectFit="cover"
          borderRadius={4}
          mb={4}
        ></Image>
      </Flex>
      <Flex
        direction="column"
        w="55%"
        minWidth="300px"
        h="100%"
        justifyContent="space-evenly"
        overflowY="scroll"
      >
        <Flex align="flex-start" width="80%" ml="8">
          <Heading
            width="25%"
            as="h4"
            textAlign="right"
            textTransform="uppercase"
            fontSize={['md', 'lg', 'xl', '2xl']}
          >
            Ingredients
          </Heading>
          <List spacing={3} ml={8} width="55%">
            {cocktail?.ingredients.map((ingredient) => (
              <ListItem key={ingredient.name}>
                <p>
                  {ingredient.amount % 1 === 0
                    ? ingredient.amount
                    : calculateFraction(ingredient.amount)}{' '}
                  {ingredient.unit} {ingredient.name}
                </p>
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex align="flex-start" justify="flex-start">
          <Heading
            width="25%"
            as="h4"
            textAlign="right"
            textTransform="uppercase"
            fontSize={['md', 'lg', 'xl', '2xl']}
          >
            Method
          </Heading>
          <List spacing={3} ml={8} width="55%">
            {cocktail?.instructions.map((instruction) => (
              <ListItem key={instruction}>
                <p>{instruction}</p>
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex width="100%" align="flex-end" px={8} wrap="wrap">
          <Flex
            align="flex-end"
            justify="flex-start"
            width="50%"
            minWidth="150px"
          >
            <Flex width="50%" align="flex-end" justify="flex-end">
              <Image
                w={responsiveImage}
                src={glass}
                mr={4}
                objectFit="cover"
                alt="glassware icon"
              />
              <Heading
                as="h4"
                textAlign="right"
                textTransform="uppercase"
                fontSize={['md', 'lg', 'xl', '2xl']}
              >
                Glass
              </Heading>
            </Flex>
            <Text width="50%" ml={8} mb={1}>
              {cocktail?.glassware}
            </Text>
          </Flex>
          {cocktail?.garnish.description ? (
            <Flex
              align="flex-end"
              justify="flex-start"
              width="50%"
              minWidth="150px"
            >
              <Flex width="50%" align="flex-end" justify="flex-end">
                <Image
                  w={responsiveImage}
                  src={garnish}
                  mr={4}
                  objectFit="cover"
                  alt="garnish icon"
                />
                <Heading
                  as="h4"
                  textAlign="right"
                  textTransform="uppercase"
                  fontSize={['md', 'lg', 'xl', '2xl']}
                >
                  Garnish
                </Heading>
              </Flex>
              <Text width="50%" ml={8} mb={1}>
                {cocktail?.garnish.description}
              </Text>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RecipeDetail;
