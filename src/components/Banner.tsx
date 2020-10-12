import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import { Flex, Center, Heading, Image } from '@chakra-ui/core';
import feature from '../tempAsset/images/old fashioned.jpeg';

function Banner() {
  const { booze } = useContext(BoozeContext);
  const [featureCocktail, setFeatureCocktail] = useState({
    name: 'test cocktail',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2017-05-25-at-6-35-25-am-1495690657.png?crop=1.00xw:0.978xh;0,0&resize=480:*',
  });

  const todayDate = new Date().getDate();

  useEffect(() => {
    console.log('---> booze.cocktails', booze.cocktails);
    if (booze.cocktails.length) {
      console.log('---> running useEffect, today:', todayDate);
      const index = Math.random() * booze.cocktails.length;
      const recipeOfTheDay = booze.cocktails[index];
      setFeatureCocktail(recipeOfTheDay);
    }
  }, [todayDate]);

  return (
    <Center pt={['2vh', '3vh', '4vh', '8vh']}>
      <Flex
        width="80vw"
        maxHeight={['30vh', '50vh']}
        borderRadius="8px"
        bgColor="purple.400"
        flexGrow={0}
        py={0}
        align="center" // THIS IS AUTOMATICALLY STRETCH ON SAFARI
        overflow="hidden"
      >
        <Image
          w="50%"
          h="auto"
          fit="contain"
          src={featureCocktail.imageUrl}
          alt="An Old Fashioned cocktail"
          flexShrink={0}
        />
        <Flex width="100%" align="center" justify="center" direction="column">
          <Heading
            as="h3"
            fontFamily="mono"
            fontWeight="normal"
            fontSize={['2xl', '3xl', '5vw', '6vw']}
          >
            {featureCocktail.name}
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
