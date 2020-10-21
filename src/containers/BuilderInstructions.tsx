import React, { useState } from 'react';
import { Flex, IconButton, Heading, Text } from '@chakra-ui/core';
import CoreRecipe from '../components/CoreRecipe';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const BuilderInstructions: React.FC = () => {
  const responsiveFontSize = ['2xl', '2xl', '3xl', '3xl'];
  const [index, setIndex] = useState(0);
  const coreRecipes = [
    {
      name: 'old fashioned',
      core: 'bourbon',
      balance: 'sugar cube',
      seasoning: 'bitters',
      variations: ['champagne cocktail', 'mint julep'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fold-fashioned.jpg?alt=media&token=56997234-f1fa-4b11-a4e2-25b7d98a9cfe',
    },
    {
      name: 'martini',
      core: 'gin',
      balance: 'dry vermouth',
      seasoning: 'lemon / olive',
      variations: ['manhattan', 'negroni'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fmartini.jpg?alt=media&token=e07331db-a9c7-4dbf-a303-d068cebc236c',
    },
    {
      name: 'daiquiri',
      core: 'rum',
      balance: 'lime juice',
      seasoning: 'simple syrup',
      variations: ['amaretto sour', 'whisky sour'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fdaiquiri.jpg?alt=media&token=a1e5c70b-7edb-43d8-8794-1ccac7e508b2',
    },
    {
      name: 'sidecar',
      core: 'cognac',
      balance: 'Cointreau',
      seasoning: 'lemon',
      variations: ['margarita', 'white lady'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fsidecar.jpg?alt=media&token=d945f152-73c3-464f-b13e-70765ef9d723',
    },
    {
      name: 'whisky highball',
      core: 'whisky',
      balance: 'soda water',
      seasoning: 'lemon',
      variations: ['gin & tonic', 'cuba libre', 'aperol spritz'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fwhisky-highball.jpg?alt=media&token=f9341fdf-5529-400e-a392-7d3573a7a99b',
    },
    {
      name: 'flip',
      core: 'port',
      balance: 'egg white',
      seasoning: 'demerara sugar',
      variations: ['white russian', 'pina colada'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fflip.jpg?alt=media&token=26d69c49-76ee-4fb4-9f67-3d092673c26f',
    },
  ];

  const handleLeftClick = () => {
    if (index === 0) return;
    setIndex((prevState) => prevState - 1);
  };

  const handleRightClick = () => {
    if (index === 5) return;
    setIndex((prevState) => prevState + 1);
  };

  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      overflowY="scroll"
      p={4}
    >
      <Heading
        as="h4"
        width="80%"
        textAlign="center"
        textTransform="uppercase"
        fontSize={['4xl', '4xl', '5xl', '5xl']}
        py={6}
      >
        Build a cocktail with Measured
      </Heading>
      <Heading
        w="80%"
        fontSize={responsiveFontSize}
        color="gray.400"
        textAlign="center"
        py={3}
      >
        Use the cocktail builder to test out combinations of ingredients and
        discover similar cocktails
      </Heading>
      <Text textAlign="center" pt={5}>
        How do you design a cocktail? Consider these{' '}
        <strong>three main parts</strong>.
      </Text>
      <Flex
        py={5}
        direction="column"
        align="center"
        justify="space-between"
        w="90%"
      >
        <Flex align="flex-end" justify="space-between" w="100%" py={2}>
          <Heading
            textAlign="right"
            w="20%"
            fontSize={responsiveFontSize}
            color="purple.400"
          >
            Base
          </Heading>
          <Text w="70%" textAlign="left" pb={1}>
            The core flavour of the drink
          </Text>
        </Flex>
        <Flex align="flex-end" justify="space-between" w="100%" py={2}>
          <Heading
            textAlign="right"
            w="20%"
            fontSize={responsiveFontSize}
            color="purple.400"
          >
            Balance
          </Heading>
          <Text w="70%" textAlign="left">
            Something to build out the drink, increasing drinkability and
            balancing the base with acidity, sweetness, or both
          </Text>
        </Flex>
        <Flex align="flex-end" justify="space-between" w="100%" py={2}>
          <Heading
            textAlign="right"
            w="20%"
            fontSize={responsiveFontSize}
            color="purple.400"
          >
            Seasoning
          </Heading>
          <Text w="70%" textAlign="left">
            An accent, a flavour that complements or contrasts the base, adding
            more dimension to the drink
          </Text>
        </Flex>
      </Flex>
      <Heading
        w="80%"
        fontSize={responsiveFontSize}
        color="gray.400"
        textAlign="center"
      >
        Classic cocktails follow six basic formulas
      </Heading>
      <Text pt={6} pb={2} textAlign="center" w="80%">
        Often, cocktails are just variations on a handful of formulas, based on
        cocktails you may already know. Use the templates below for inspiration.
      </Text>
      <Text pb={6} pt={2} textAlign="center" w="80%">
        Vary the three elements, experiment with new combinations, or tweak the
        proportions. You could stumble on some boozy delights of your own.
      </Text>
      <Flex my={6} w="100%" align="center" justify="space-between">
        <IconButton
          aria-label="Change index"
          icon={<ChevronLeftIcon fontSize="3xl" />}
          background="white"
          onClick={handleLeftClick}
          height="100%"
        />
        <CoreRecipe recipe={coreRecipes[index]} index={index} />
        <IconButton
          aria-label="Change index"
          icon={<ChevronRightIcon fontSize="3xl" />}
          background="white"
          onClick={handleRightClick}
          height="100%"
        />
      </Flex>
      <Flex width="100%" mb={4} mt={1} align="center" justify="space-between">
        <Flex
          direction="column"
          align="center"
          justify="center"
          w="33%"
          textAlign="center"
        >
          <Heading w="100%" fontSize={responsiveFontSize} color="purple.400">
            Base
          </Heading>
          <Text w="100%">{coreRecipes[index].core}</Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          w="33%"
          textAlign="center"
        >
          <Heading w="100%" fontSize={responsiveFontSize} color="purple.400">
            Balance
          </Heading>
          <Text w="100%">{coreRecipes[index].balance}</Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          w="33%"
          textAlign="center"
        >
          <Heading w="100%" fontSize={responsiveFontSize} color="purple.400">
            Seasoning
          </Heading>
          <Text w="100%">{coreRecipes[index].seasoning}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BuilderInstructions;
