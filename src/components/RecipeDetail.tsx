import React from 'react';
import { RouteComponentProps } from '@reach/router';

import garnish from '../assets/images/garnish.png';
import glass from '../assets/images/glass.png';

import { Cocktail } from '../interfaces';

import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  // dumb-ass function but no use-case as yet for a more complex formula
  const calculateFraction = (num: number) => {
    const fractionString = num.toString();
    let [integer, decimal] = fractionString.split('.');
    integer === '0' ? (integer = '') : (integer = integer + ' ');
    if (decimal === '25') decimal = '¼';
    else if (decimal === '5') decimal = '½';
    else if (decimal === '75') decimal = '¾';
    return integer + decimal;
  };

  const urlLocation = location.pathname == '/my-bar';
  let responsiveImage;
  let iw; //image Width
  let ih; //imageHeight;
  let ch; //card Height;
  let cw; //card Width;
  let hfs; //heading Font Size;
  let shfs; //sub Heading Font Size;
  urlLocation ? (iw = '85%') : (iw = '85%');
  urlLocation ? (ih = '85%') : (ih = '85%');
  urlLocation ? (ch = '30vh') : (ch = '80vh');
  urlLocation ? (cw = '30vw') : (cw = '80vw');
  urlLocation
    ? (hfs = ['10px', '10px', '10px', '10px'])
    : (hfs = ['xl', '2xl', '3xl', '4vw']);
  urlLocation
    ? (shfs = ['10px', '10px', '10px', '10px'])
    : (shfs = ['md', 'lg', 'xl', '2xl']);
  urlLocation
    ? (responsiveImage = ['10px', '20px', '30px', ' 40px'])
    : (responsiveImage = ['15px', '30px', '40px', ' 50px']);

  return urlLocation ? (
    <Flex
      height={ch}
      width={cw}
      backgroundColor="rgb(240,240,240, 0.5)"
      boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
      borderRadius={20}
      margin="10px"
      mt={5}
      overflowX="scroll"
    >
      <Flex w="50%" flexDirection="column">
        <Image
          src={cocktail?.imageUrl}
          w={iw}
          h={ih}
          m="auto"
          objectFit="cover"
          borderRadius="8px"
          boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
        ></Image>
      </Flex>
      <Flex direction="column" w="100%" h="100%" justifyContent="space-evenly">
        <Flex direction="column">
          <Heading
            as="h3"
            fontWeight="200"
            color="purple.400"
            textAlign="center"
            fontSize={hfs}
          >
            {cocktail.name.charAt(0).toUpperCase() + cocktail.name.slice(1)}
          </Heading>
          <Text fontFamily="heading" mb="2%" fontSize={shfs}>
            Ingredients:
          </Text>
          <Flex>
            {cocktail?.ingredients.map((ingredient) => (
              <Flex key={ingredient.name} margin="2px">
                <Text fontSize="10px">• {ingredient.name}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Box>
          <Text fontFamily="heading" fontSize={shfs}>
            Method:
          </Text>
          <Text fontSize="10px">
            {cocktail.instructions[0].charAt(0).toUpperCase() +
              cocktail.instructions[0].slice(1)}
            ...
          </Text>
        </Box>
        <Flex w="100%">
          <Flex w="50%">
            <Image
              w={responsiveImage}
              h={responsiveImage}
              src={glass}
              objectFit="cover"
              alt="glassware icon"
            />
            <Text fontSize="10px">: {cocktail?.glassware}</Text>
          </Flex>
          <Flex w="50%">
            <Image
              w={responsiveImage}
              h={responsiveImage}
              src={garnish}
              objectFit="cover"
              alt="garnish icon"
            />
            <Text fontSize="10px">
              :{' '}
              {cocktail?.garnish.description !== ''
                ? cocktail?.garnish.description
                : 'n/a'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ) : (
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
        w={['80%', '60%', '40%', '40%']}
        minWidth="338px"
        flexDirection="column"
        mx="auto"
        my="auto"
        justify="space-evenly"
        align="center"
      >
        <Heading
          as="h3"
          fontFamily="mono"
          color="purple.400"
          textAlign="center"
          my={4}
          fontSize={['5xl', '5xl', '6xl', '7xl']}
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
        w={['90%', '90%', '75%', '55%']}
        minWidth="338px"
        h="100%"
        justifyContent="space-evenly"
        overflowY="scroll"
      >
        <Flex align="flex-start" justify="flex-start" width="100%">
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
        <Flex align="flex-start" width="100%" justify="flex-start">
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
            width={['90%', '80%', '60%', '50%']}
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
            <Text width="50%" ml={8} mb={1} fontSize="sm">
              {cocktail?.glassware}
            </Text>
          </Flex>
          {cocktail?.garnish.description ? (
            <Flex
              align="flex-end"
              justify="flex-start"
              width={['90%', '80%', '60%', '50%']}
              minWidth="150px"
            >
              <Flex width="50%" align="flex-end" justify="flex-end">
                <Image
                  w={responsiveImage}
                  src={garnish}
                  mr={2}
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
              <Text width="50%" ml={8} mb={1} fontSize="sm">
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
