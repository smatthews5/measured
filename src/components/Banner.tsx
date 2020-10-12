import React from 'react';
import { Flex, Center, Heading, Image } from '@chakra-ui/core';
import feature from '../tempAsset/images/old fashioned.jpeg';

function Banner() {
  return (
    <Center py="10">
      <Flex width="80vw" borderRadius="8px" bgColor="purple.400">
        <Image
          w="50%"
          h="auto"
          fit="contain"
          src={feature}
          alt="An Old Fashioned cocktail"
          borderLeftRadius="8px"
          flexShrink={0}
        />
        <Flex width="100%" align="center" justify="center" direction="column">
          <Heading
            as="h3"
            fontFamily="mono"
            fontWeight="normal"
            fontSize={['2xl', '3xl', '5vw', '6vw']}
          >
            Old Fashioned
          </Heading>
          <hr />
          <Heading
            as="h3"
            fontWeight="normal"
            fontSize={['lg', 'xl', '3xl', '3vw']}
          >
            Recipe of the day
          </Heading>
        </Flex>
      </Flex>
    </Center>
  );
}

export default Banner;
