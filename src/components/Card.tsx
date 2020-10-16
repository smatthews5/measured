/* eslint-disable no-prototype-builtins */
import React, { useState } from 'react';

import { Box, Flex, Image, Heading } from '@chakra-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';

import ingredients from '../assets/images/ingredients.png';
import like from '../assets/images/like.png';
import loading from '../assets/images/loading.png';

import { Cocktail, Ingredient } from '../interfaces';

interface CardProps extends RouteComponentProps {
  content: Cocktail | Ingredient;
}

const Card: React.FC<CardProps> = ({ content }) => {
  const [showBadge, toggleBadge] = useState(false);

  const cardWidth = content.hasOwnProperty('base') ? '25%' : '10%';
  const cardMinWidth = content.hasOwnProperty('base') ? '25%' : '10%';
  const imageWidth = content.hasOwnProperty('base') ? '18vw' : '10vw';
  const imageHeight = content.hasOwnProperty('base') ? '18vw' : '10vw';
  const responsiveText = content.hasOwnProperty('base')
    ? ['md', 'lg', 'xl', '2xl']
    : ['8px', '9px', '10px', '11px'];

  const responsiveBadge = ['0px', '0px', '60px', '60px'];
  const responsiveHeading = ['0px', '0px', '58px', '58px'];

  return (
    <Flex
      direction="column"
      width={cardWidth}
      minWidth={cardMinWidth}
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
              fallbackSrc={loading}
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
        <Heading as="h6" fontSize={['0px', '0px', 'sm', 'md']} fontWeight="200">
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
        <Image
          position="absolute"
          bottom={['8%', '8%', '2%', '2%']}
          right="10%"
          fit="contain"
          src={like}
          alt="like button"
          w="20px"
        ></Image>
      </Flex>
    </Flex>
  );
};

export default Card;
