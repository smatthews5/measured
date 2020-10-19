/* eslint-disable no-prototype-builtins */
import React, { useContext, useState, useEffect } from 'react';

import {
  Box,
  Flex,
  Image,
  Heading,
  IconButton,
  Tooltip,
  useToast,
} from '@chakra-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';
import { CloseIcon } from '@chakra-ui/icons';
import { UserContext } from '../Context';

import ingredients from '../assets/images/ingredients.png';
import empty from '../assets/images/empty.png';
import full from '../assets/images/full.png';
import loading from '../assets/images/loading.png';

import { Cocktail, Ingredient } from '../interfaces';
import {
  addCocktail,
  getUserDocument,
  removeCocktail,
} from '../services/firebase';

interface CardProps extends RouteComponentProps {
  content: Cocktail | Ingredient;
}

const Card: React.FC<CardProps> = ({ content }) => {
  const [showBadge, toggleBadge] = useState<boolean>(false);
  const [showFavourite, toggleFavourite] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const toast = useToast();
  
  const imageWidth = content.hasOwnProperty('base') ? '18vw' : '16vw';
  const imageHeight = content.hasOwnProperty('base') ? '18vw' : '16vw';

  const responsiveText = ['sm', 'lg', 'xl', '2xl'];
  const responsiveBadge = ['0px', '0px', '60px', '60px'];
  const responsiveHeading = ['0px', '0px', '58px', '58px'];

  const handleClickMyBar = async (cocktail: string) => {
    let cocktailList = user?.likedDrinks.slice();
    if (!cocktailList.includes(cocktail)) {
      addCocktail(user.uid, cocktail);
      toggleFavourite(true);
    } else {
      removeCocktail(user.uid, cocktail);
      toggleFavourite(false);
    }
    const updatedUser = await getUserDocument(user.uid);
    setUser(updatedUser);
  };

  useEffect(() => {
    if (user && user.likedDrinks.includes(content.name)) toggleFavourite(true);
    else toggleFavourite(false);
  }, [user?.likedDrinks]);

  return (
    <Flex
      direction="column"
      width="25%"
      minWidth="25%"
      borderRadius="6px"
      m={2}
      ml="0"
      pb={2}
      position="relative"
    >
      <Box position="relative">
        {content.hasOwnProperty('base') && showBadge ? (
          <Box
            position="absolute"
            bottom="10px"
            right="13%"
            w={responsiveBadge}
            h={responsiveBadge}
          >
            <Image
              fit="contain"
              src={ingredients}
              alt="ingredients indicator"
              w="100%"
            ></Image>
            <Heading
              fontFamily="mono"
              lineHeight="70%"
              fontWeight="200"
              fontSize={responsiveHeading}
              color="white"
              position="absolute"
              left="25%"
              top="15%"
            >
              {content.ingredientsList.length}
            </Heading>
          </Box>
        ) : null}
        <Image
          fit="cover"
          borderRadius="5px"
          fallbackSrc={loading}
          src={content.imageUrl}
          onLoad={() => toggleBadge(true)}
          alt={content.name}
          w={imageWidth}
          h={imageHeight}
          overflow="hidden"
          onClick={() =>
            content.hasOwnProperty('base')
              ? navigate(`/recipes/${content.name}`)
              : null
          }
        />
      </Box>
      <Flex
        direction="column"
        align="flex-start"
        justify="flex-start"
        padding="2px"
        pt="4%"
      >
        <Flex width="90%" align="center" justify="space-between" wrap="nowrap">
          <Heading
            as="h4"
            textTransform="capitalize"
            fontWeight="200"
            fontSize={responsiveText}
            fontFamily="body"
            isTruncated
            maxWidth="70%"
            mb={2}
          >
            {content.name}
          </Heading>
          <Heading
            as="h5"
            textTransform="uppercase"
            fontWeight="200"
            fontSize={['0px', '0px', 'sm', 'md']}
          >
            {content.hasOwnProperty('base') ? content.base.toLowerCase() : null}
          </Heading>
        </Flex>
        <hr id="wide" />
        <Heading
          as="h6"
          fontSize={['0px', '0px', 'sm', 'md']}
          fontWeight="200"
          mt={3}
        >
          {content.hasOwnProperty('base')
            ? content.categories
                .sort((a, b) => (a > b ? 1 : -1))
                .map((category, index) => {
                  if (index === content.categories.length - 1)
                    return `${category}`;
                  else return `${category} — `;
                })
            : null}
        </Heading>
        {content.hasOwnProperty('base') ? (
          <Tooltip
            label={
              showFavourite ? 'Remove from favourites' : 'Add to favourites'
            }
            fontSize="sm"
            bgColor="purple.400"
          >
            <Image
              position="absolute"
              bottom={['22%', '22%', '3%', '3%']}
              right="10%"
              fit="contain"
              fallbackSrc={loading}
              src={showFavourite ? full : empty}
              alt="empty glass icon"
              w={['15px', '15px', '25px', '25px']}
              onClick={
                user
                  ? () => handleClickMyBar(content.name)
                  : () => toast({
                      title: 'Please Log In.',
                      description:
                        'You need to be logged in to add cocktails to your favourites.',
                      status: 'warning',
                      duration: 5000,
                      isClosable: true,
                    })
              }
            ></Image>
          </Tooltip>
        ) : (
          <IconButton
            position="absolute"
            right="10%"
            width={['5px', '20px']}
            height={['5px', '20px']}
            aria-label="delete"
            icon={<CloseIcon />}
            colorScheme="gray"
            variant="ghost"
            size="sm"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Card;
