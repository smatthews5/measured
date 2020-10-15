/* eslint-disable no-prototype-builtins */
import React from 'react';

import { Flex, Image, Heading } from '@chakra-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';

import { Cocktail } from '../interfaces';

interface CardProps extends RouteComponentProps {
  cocktail: Cocktail;
}

const Card: React.FC<CardProps> = ({ cocktail }) => {
  let cardWidth;
  let cardMinWidth;
  let imageWidth;
  let imageHeight;
  let responsiveText;
  cocktail.hasOwnProperty('base') ? cardWidth = '25%' : cardWidth= '10%';
  cocktail.hasOwnProperty('base') ? cardMinWidth = '25%' : cardMinWidth= '10%';
  cocktail.hasOwnProperty('base') ? imageWidth = '18vw' : imageWidth= '10vw';
  cocktail.hasOwnProperty('base') ? imageHeight = '18vw' : imageHeight= '10vw';
  cocktail.hasOwnProperty('base') ? responsiveText = ['md', 'lg', 'xl', '2xl'] : responsiveText= ['8px', '9px', '10px', '11px'];
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
        src={cocktail.imageUrl}
        alt={cocktail.name}
        w={imageWidth}
        h={imageHeight}
        overflow="hidden"
        onClick={() => cocktail.hasOwnProperty('base') ? navigate(`/recipes/${cocktail.name}`) : null}
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
            {cocktail.name}
          </Heading>
          <Heading
            as="h5"
            textTransform="uppercase"
            fontWeight="200"
            fontSize={['0px', '0px', 'sm', 'md']}
          >
            {cocktail.hasOwnProperty('base') ? cocktail.base.toLowerCase():''}
          </Heading>
        </Flex>
        <hr id="wide" />
        <Heading as="h6" fontSize={['0px', '0px', 'sm', 'md']} fontWeight="200">
          {cocktail.categories
            .sort((a, b) => (a > b ? 1 : -1))
            .map((category, index) => {
              if (index === cocktail.categories.length - 1)
                return `${category}`;
              else return `${category} — `;
            })}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Card;
