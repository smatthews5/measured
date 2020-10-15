/* eslint-disable no-prototype-builtins */
import React from 'react';

import { Flex, Image, Heading } from '@chakra-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';

import { Cocktail, Ingredient } from '../interfaces';

interface CardProps extends RouteComponentProps {
  content: Cocktail | Ingredient;
}

const Card: React.FC<CardProps> = ({ content }) => {
  let cardWidth;
  let cardMinWidth;
  let imageWidth;
  let imageHeight;
  let responsiveText;
  content.hasOwnProperty('base') ? (cardWidth = '25%') : (cardWidth = '10%');
  content.hasOwnProperty('base')
    ? (cardMinWidth = '25%')
    : (cardMinWidth = '10%');
  content.hasOwnProperty('base')
    ? (imageWidth = '18vw')
    : (imageWidth = '10vw');
  content.hasOwnProperty('base')
    ? (imageHeight = '18vw')
    : (imageHeight = '10vw');
  content.hasOwnProperty('base')
    ? (responsiveText = ['md', 'lg', 'xl', '2xl'])
    : (responsiveText = ['8px', '9px', '10px', '11px']);
  return (
    <Flex
      direction="column"
      width={cardWidth}
      minWidth={cardMinWidth}
      borderRadius="6px"
      m={2}
      ml="0"
      pb={2}
    >
      <Image
        fit="cover"
        borderRadius="5px"
        src={content.imageUrl}
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
            fontSize={['md', 'lg', 'xl', '2xl']}
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
            {content.hasOwnProperty('base') ? content.base.toLowerCase() : ''}
          </Heading>
        </Flex>
        <hr id="wide" />
        <Heading as="h6" fontSize={['0px', '0px', 'sm', 'md']} fontWeight="200">
          {content.categories
            .sort((a, b) => (a > b ? 1 : -1))
            .map((category, index) => {
              if (index === content.categories.length - 1) return `${category}`;
              else return `${category} — `;
            })}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Card;
