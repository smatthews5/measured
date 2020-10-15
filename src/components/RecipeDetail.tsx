import React from 'react';
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
import garnish from '../assets/images/garnish2.png';
import glass from '../assets/images/glass2.png';

import { Cocktail } from '../interfaces';

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  const urlLocation = location.pathname == '/my-bar';
  let responsiveImage;
  let iw; //image Width
  let ih; //imageHeight;
  let ch; //card Height;
  let cw; //card Width;
  let hfs; //heading Font Size;
  let shfs; //subHeadingFontSize;
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
    <>
      <Flex
        height={ch}
        width={cw}
        backgroundColor="rgb(240,240,240, 0.5)"
        boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
        borderRadius={20}
        margin="10px"
        mt={5}
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
        <Flex
          direction="column"
          w="100%"
          h="100%"
          justifyContent="space-evenly"
        >
          <Flex direction="column">
            <Heading
              as="h3"
              fontWeight="200"
              color="purple.400"
              textAlign="center"
              fontSize={hfs}
            >
              {cocktail?.name.charAt(0).toUpperCase() + cocktail?.name.slice(1)}
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
              {cocktail?.instructions[0].charAt(0).toUpperCase() +
                cocktail?.instructions[0].slice(1)}
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
    </>
  ) : (
    <>
      <Flex
        height={ch}
        width={cw}
        backgroundColor="rgb(240,240,240, 0.5)"
        boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
        borderRadius={20}
        margin="auto"
        mt={5}
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
        <Flex
          direction="column"
          w="100%"
          h="100%"
          justifyContent="space-evenly"
        >
          <Box>
            <Heading
              as="h3"
              fontWeight="200"
              color="purple.400"
              textAlign="center"
              fontSize={hfs}
            >
              {cocktail?.name}
            </Heading>
            <Text fontFamily="heading" mb="2%" fontSize={shfs}>
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
            <Text fontFamily="heading" fontSize={shfs}>
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
