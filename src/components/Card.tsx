/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Flex, Image } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';

import { Cocktail } from '../interfaces';

interface CardProps extends RouteComponentProps {
  cocktail: Cocktail;
}

const Card: React.FC<CardProps> = ({ cocktail }) => {
  return (
    <Flex
      direction="column"
      width="15vw"
      minWidth="15vw"
      borderRadius="4px"
      margin="2%"
    >
      <Flex>
        <Image
          objectFit="cover"
          borderRadius="4px"
          src={cocktail.imageUrl}
          boxShadow="0px 0px 9px 1px rgba(0, 0, 0, 0.75)"
          alt="drink"
          height="25vh"
          width="100%"
        />
      </Flex>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'center' }}
        justifyContent="space-between"
        padding="2px"
        height={{ base: '50%', md: '75%', lg: '100%' }}
        width={{ base: '50%', md: '75%', lg: '100%' }}
        pt="4%"
      >
        <Flex align="center" padding="2px">
          <h4>{cocktail.name}</h4>
        </Flex>
        <Flex align="center" justify="center" padding="2px">
          <h5
            css={css`
              margin-right: 2px;
            `}
          >
            {cocktail.base} -
          </h5>
          <h5>{cocktail.categories[0]}</h5>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;
