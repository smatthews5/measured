import React, { useState } from 'react';
import { Flex, Text, Heading, IconButton } from '@chakra-ui/core';
import CoreRecipe from '../components/CoreRecipe';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const BuilderInstructions: React.FC = () => {
  const [index, setIndex] = useState(0);
  const coreRecipes = [
    {
      name: 'old fashioned',
      core: '2 oz. bourbon',
      balance: '1 sugar cube',
      seasoning: '2 dashes bitters',
      variations: ['champagne cocktail', 'mint julep'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fold-fashioned.jpg?alt=media&token=56997234-f1fa-4b11-a4e2-25b7d98a9cfe',
    },
    {
      name: 'martini',
      core: '2 oz. gin',
      balance: '¾ oz. dry vermouth',
      seasoning: '1 lemon twist/ olive',
      variations: ['manhattan', 'negroni'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fmartini.jpg?alt=media&token=fd7bb2e5-106f-426d-9617-a0674e4d6334',
    },
    {
      name: 'daiquiri',
      core: '2 oz. rum',
      balance: '¾ oz. lime juice',
      seasoning: '¾ oz. simple syrup',
      variations: ['amaretto sour', 'whisky sour'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/ingredients%2Fdaiquiri.jpg?alt=media&token=113b7562-30d5-4e1e-a555-f988bcac796b',
    },
    {
      name: 'sidecar',
      core: '1½ oz. cognac',
      balance: '1 oz. Cointreau',
      seasoning: '¾ oz. lemon juice',
      variations: ['margarita', 'white lady'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fsidecar.jpg?alt=media&token=013b9006-3c3f-4625-8e03-c168171804e5',
    },
    {
      name: 'whisky highball',
      core: '2 oz. whisky',
      balance: '6 oz. soda water',
      seasoning: '1 lemon wedge',
      variations: ['gin & tonic', 'cuba libre', 'aperol spritz'],
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/measured-885db.appspot.com/o/cocktails%2Fwhisky-highball.jpg?alt=media&token=f9341fdf-5529-400e-a392-7d3573a7a99b',
    },
    {
      name: 'flip',
      core: '2 oz. port',
      balance: '1 whole egg',
      seasoning: '2 tsps. demerara sugar',
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
    <Flex direction="column" mt="1%" width="40vw" mx="auto">
      <Flex color="purple.400" fontFamily="heading" fontSize="4vh">
        Use the cocktail builder to test out combinations of ingredients and
        discover similar cocktails!
      </Flex>
      <Flex alignItems="center" mt="2%">
        <Flex fontFamily="heading" fontSize="4vh" textTransform="uppercase">
          Core:
        </Flex>
        <Flex pl="16%" pb="3px">
          The main flavour of the drink, usually a spirit or wine
        </Flex>
      </Flex>
      <Flex alignItems="center" mt="1%">
        <Flex fontFamily="heading" fontSize="4vh" textTransform="uppercase">
          Balance:
        </Flex>
        <Flex pl="9%" pb="3px" justifySelf="flex-end">
          Increase the drinkability by balancing the drink with acidity or
          sweetness (or both!)
        </Flex>
      </Flex>
      <Flex alignItems="center" mt="1%">
        <Flex fontFamily="heading" fontSize="4vh" textTransform="uppercase">
          Seasoning:
        </Flex>
        <Flex pl="5%" pb="3px">
          Add flavour to complement or contrast the core and add more dimension
          to the drink
        </Flex>
      </Flex>
      <Flex mt="2%">
        Most cocktails are simply variations on a handful of basic formulas.
        Explore the templates below for inspiration, by varying the three
        elements and experimenting with new combinations and proportions you can
        discover new drinks!
      </Flex>
      <Flex mt="2%" height="35vh">
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
        <Flex
          direction="column"
          width="40%"
          ml="5%"
          alignItems="center"
          justifyContent="center"
        >
          <Flex justifyContent="space-between" width="100%">
            <Flex textTransform="uppercase" alignSelf="flex-start">
              Core:
            </Flex>
            <Flex>{coreRecipes[index].core}</Flex>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Flex textTransform="uppercase" alignSelf="flex-start">
              Balance:
            </Flex>
            <Flex>{coreRecipes[index].balance}</Flex>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Flex textTransform="uppercase" alignSelf="flex-start">
              Seasoning:
            </Flex>
            <Flex>{coreRecipes[index].seasoning}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BuilderInstructions;
