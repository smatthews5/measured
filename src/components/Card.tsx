/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Flex, Image } from '@chakra-ui/core';
import drink from '../tempAsset/images/americano.jpeg';

const Card: React.FC = () => {
  return (
    <Flex
      direction="column"
      width="15vw"
      minWidth="15vw"
      borderRadius="4px"
      mx="2vw"
    >
      <Flex>
        <Image
          height="25vh"
          width="15vw"
          objectFit="cover"
          borderRadius="5px"
          src={drink}
          boxShadow="0px 0px 9px 1px rgba(0, 0, 0, 0.75)"
          alt="drink"
        />
      </Flex>
      <Flex justify="space-between" padding="2px">
        <Flex align="center">
          <h4>Americano</h4>
        </Flex>
        <Flex align="center" padding="2px">
          <h5
            css={css`
              margin-right: 2px;
            `}
          >
            Gin -
          </h5>
          <h5>Refreshing</h5>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;
