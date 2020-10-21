/* eslint-disable no-prototype-builtins */
import React, { useContext, useState, useEffect } from 'react';

import { Box, Flex, Image, Heading, Tooltip, useToast } from '@chakra-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';
import { UserContext } from '../Context';

import ingredients from '../assets/images/ingredients.png';
import empty from '../assets/images/empty.png';
import full from '../assets/images/full.png';
import loading from '../assets/images/loading.png';

import { Cocktail } from '../interfaces';
import {
  addCocktail,
  getUserDocument,
  removeCocktail,
} from '../services/firebase';

interface CardProps extends RouteComponentProps {
  content: Cocktail;
}

const Card: React.FC<CardProps> = ({ content }) => {
  const [showBadge, toggleBadge] = useState<boolean>(false);
  const [showFavourite, toggleFavourite] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const toast = useToast();

  const imageWidth = '18vw';
  const imageHeight = '18vw';

  const responsiveText = ['sm', 'lg', 'xl', '2xl'];
  const responsiveBadge = ['0px', '0px', '60px', '60px'];
  const responsiveHeading = ['0px', '0px', '58px', '58px'];

  const handleClickMyBar = async (cocktail: string) => {
    if (user) {
      if (!user.likedDrinks.includes(cocktail)) {
        addCocktail(user.uid, cocktail);
      } else {
        removeCocktail(user.uid, cocktail);
      }
      const updatedUser = await getUserDocument(user.uid);
      if (updatedUser && setUser) setUser(updatedUser);
    }
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
          onClick={() => navigate(`/recipes/${content.name}`)}
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
            {content.base.toLowerCase()}
          </Heading>
        </Flex>
        <hr id="wide" />
        <Heading
          as="h6"
          fontSize={['0px', '0px', 'sm', 'md']}
          fontWeight="200"
          mt={3}
        >
          {content.categories.map((category, index) => {
            if (index > 2) return '';
            else if (index === content.categories.length - 1 || index === 2)
              return `${category}`;
            else return `${category} — `;
          })}
        </Heading>

        <Tooltip
          label={showFavourite ? 'Remove from favourites' : 'Add to favourites'}
          fontSize="sm"
          bgColor="purple.400"
        >
          <Image
            position="absolute"
            bottom={['22%', '22%', '3%', '3%']}
            right="10%"
            border="2px white solid"
            bgColor="white"
            fit="contain"
            fallbackSrc={loading}
            src={showFavourite ? full : empty}
            alt={showFavourite ? 'full glass icon' : 'empty glass icon'}
            w={['15px', '15px', '25px', '25px']}
            onClick={
              user
                ? () => handleClickMyBar(content.name)
                : () =>
                    toast({
                      title: 'Log in / sign up to Measured',
                      description:
                        'Want to add cocktails to your favourites? Create an account or login.',
                      status: 'warning',
                      duration: 5000,
                      isClosable: true,
                    })
            }
          ></Image>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Card;
