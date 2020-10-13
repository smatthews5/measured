import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import { Flex, Center, Heading, Image } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';

function Banner() {
  const { booze } = useContext(BoozeContext);
  const [featureCocktail, setFeatureCocktail] = useState<Cocktail>({
    base: '',
    categories: [''],
    garnish: '',
    id: '',
    imageUrl: '',
    ingredients: [],
    ingredientsList: [''],
    instructions: [{ 0: '' }],
    name: '',
  });

  const todayDate = new Date().getDate();

  useEffect(() => {
    if (booze.cocktails.length) {
      const index = Math.floor(Math.random() * booze.cocktails.length);
      const recipeOfTheDay = booze.cocktails[index];
      setFeatureCocktail(recipeOfTheDay);
    }
  }, [todayDate, booze.cocktails.length]);

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
          src={featureCocktail.imageUrl || undefined}
          alt={featureCocktail.name || undefined}
          flexShrink={0}
        />
        <Flex width="100%" align="center" justify="center" direction="column">
          <Heading
            as="h3"
            fontFamily="mono"
            fontWeight="normal"
            fontSize={['2xl', '3xl', '5vw', '6vw']}
          >
            {featureCocktail.name || null}
          </Heading>
          <hr />
          <Heading
            as="h3"
            fontWeight="normal"
            fontSize={['lg', 'xl', '3xl', '3vw']}
            textTransform="none"
          >
            Recipe of the day
          </Heading>
        </Flex>
      </Flex>
    </Center>
  );
}

export default Banner;
