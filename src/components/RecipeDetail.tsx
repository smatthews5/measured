import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { UserContext } from '../Context';
import {
  addCocktail,
  getUserDocument,
  removeCocktail,
} from '../services/firebase';

import garnish from '../assets/images/garnish.png';
import glass from '../assets/images/glass.png';
import empty from '../assets/images/empty.png';
import full from '../assets/images/full.png';
import loading from '../assets/images/loading.png';

import { Cocktail } from '../interfaces';

import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  Tooltip,
} from '@chakra-ui/core';
import { calculateFraction } from '../utilities';

interface RecipeDetailProps extends RouteComponentProps {
  cocktail: Cocktail | undefined;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ cocktail }) => {
  const { user, setUser } = useContext(UserContext);
  const [showFavourite, toggleFavourite] = useState<boolean>(false);

  const responsiveImage = ['0px', '0px', '40px', ' 50px'];

  useEffect(() => {
    if (user && user.likedDrinks.includes(cocktail?.name))
      toggleFavourite(true);
    else toggleFavourite(false);
  }, [user?.likedDrinks]);

  const handleClickMyBar = async (cocktail: string) => {
    let cocktailList = user?.likedDrinks.slice();
    if (!cocktailList?.includes(cocktail)) {
      addCocktail(user?.uid, cocktail);
      toggleFavourite(true);
    } else {
      removeCocktail(user?.uid, cocktail);
      toggleFavourite(false);
    }
    const updatedUser = await getUserDocument(user?.uid);
    setUser(updatedUser);
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
      position="relative"
    >
      <Box position="absolute" top="5%" right="2.5%">
        <Tooltip
          label={showFavourite ? 'Remove from favourites' : 'Add to favourites'}
          fontSize="sm"
          bgColor="purple.400"
        >
          <Image
            fit="contain"
            fallbackSrc={loading}
            src={showFavourite ? full : empty}
            alt="empty glass icon"
            w={['25px', '25px', '40px', '50px']}
            onClick={
              user
                ? () => handleClickMyBar(cocktail.name)
                : () => console.log('Not logged in!')
            }
          ></Image>
        </Tooltip>
      </Box>
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
                <Text ml={2}>
                  {ingredient.amount % 1 === 0
                    ? Math.round(ingredient.amount)
                    : calculateFraction(ingredient.amount)}{' '}
                  {ingredient.unit} {ingredient.name}
                </Text>
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
                <Text ml={2}>{instruction}</Text>
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex width="100%" align="center" px={8} wrap="wrap">
          <Flex
            align="center"
            justify="flex-start"
            width={['90%', '90%', '60%', '50%']}
            minWidth="150px"
          >
            <Flex
              width={['25%', '25%', '50%', '50%']}
              align="center"
              justify="flex-end"
            >
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
            <Text width="55%" ml={8} mb={1} fontSize={['md', 'md', 'sm', 'sm']}>
              {cocktail?.glassware}
            </Text>
          </Flex>
          {cocktail?.garnish.description ? (
            <Flex
              align="center"
              justify="flex-start"
              width={['90%', '90%', '60%', '50%']}
              minWidth="150px"
            >
              <Flex
                width={['25%', '25%', '50%', '50%']}
                align="center"
                justify="flex-end"
              >
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
              <Text
                width="55%"
                ml={8}
                mb={1}
                fontSize={['md', 'md', 'sm', 'sm']}
              >
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
