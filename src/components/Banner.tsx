import React from 'react';
import { Flex, Image } from '@chakra-ui/core';
import feature from '../tempAsset/images/old fashioned.jpeg';

function Banner() {
  return (
    <Flex justify="center" align="center">
      <Flex
        width="80vw"
        justify="space-around"
        align="center"
        border="solid black 1px"
        py={50}
      >
        <Image
          w="40%"
          h="40%"
          objectFit="cover"
          src={feature}
          alt="An Old Fashioned cocktail"
        />
        <Flex width="30%" height="100%" border="solid black 1px">
          Old Fashioned
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Banner;
