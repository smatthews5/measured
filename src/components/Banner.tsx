/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import { Box, Flex, Center, Heading, Image } from '@chakra-ui/core';

import { Cocktail } from '../interfaces';
import { navigate } from '@reach/router';

import ingredients from '../assets/images/ingredients.png';
import loading from '../assets/images/loading.png';

const responsiveBadge = ['60px', '60px', '100px', '100px'];
const responsiveHeading = ['58px', '58px', '96px', '96px'];

const Banner: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const [showBadge, toggleBadge] = useState(false);
  const [featureCocktail, setFeatureCocktail] = useState<Partial<Cocktail>>({});

  const todayDate = new Date().getDate();

  useEffect(() => {
    if (booze?.cocktails.length) {
      const index = Math.floor(Math.random() * booze.cocktails.length);
      const recipeOfTheDay = booze.cocktails[index];
      setFeatureCocktail(recipeOfTheDay);
    }
  }, [todayDate, booze?.cocktails.length, booze?.cocktails]);

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
        onClick={() => navigate(`/recipes/${featureCocktail.name}`)}
      >
        <Flex
          position="relative"
          width="50%"
          minWidth="50%"
          alignSelf="flex-start"
        >
          <Image
            w="40vw"
            h="40vw"
            align="center top"
            fit="cover"
            fallbackSrc={loading}
            src={featureCocktail.imageUrl}
            alt={featureCocktail.name}
            onLoad={() => toggleBadge(true)}
            flexShrink={0}
            zIndex="0"
          />
          {showBadge ? (
            <Box
              position="absolute"
              top="1.5vw"
              right="1.5vw"
              w={responsiveBadge}
              h={responsiveBadge}
            >
              <Image
                fit="cover"
                src={ingredients}
                alt="ingredients indicator"
                w="100%"
                h="100%"
              ></Image>
              <Heading
                textAlign="right"
                fontFamily="mono"
                lineHeight="70%"
                fontWeight="200"
                fontSize={responsiveHeading}
                color="white"
                position="absolute"
                left="25%"
                top="15%"
                zIndex="10"
              >
                {featureCocktail.ingredientsList
                  ? featureCocktail.ingredientsList.length
                  : null}
              </Heading>
            </Box>
          ) : null}
        </Flex>
        <Flex width="50%" align="center" justify="center" direction="column">
          <Heading
            as="h3"
            color="white"
            fontFamily="mono"
            fontWeight="normal"
            fontSize={['2xl', '3xl', '4vw', '6vw']}
          >
            {featureCocktail.name}
          </Heading>
          <hr />
          <Heading
            as="h4"
            fontFamily="body"
            fontWeight="200"
            color="white"
            fontSize={['lg', 'xl', '2xl', '2vw']}
            mt={5}
          >
            Featured cocktail
          </Heading>
        </Flex>
      </Flex>
    </Center>
  );
};

export default Banner;
