import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';
import { Flex, Image, Box, IconButton, Button } from '@chakra-ui/core';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import shaker from '../assets/images/Cocktail_shaker.png';

const CocktailShaker: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const ingredients = booze?.ingredients;

  const [seasoningIndex, setSeasoningIndex] = useState(0);
  const [balanceIndex, setBalanceIndex] = useState(0);
  const [coreIndex, setCoreIndex] = useState(0);

  const [selection, setSelection] = useState([]);

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  const seasoning = ingredients.filter((ingredient) =>
    ingredient.builder.includes('seasoning'),
  );
  const balance = ingredients.filter((ingredient) =>
    ingredient.builder.includes('balance'),
  );
  const core = ingredients.filter((ingredient) =>
    ingredient.builder.includes('core'),
  );

  const updateSelection = () => {
    setSelection([
      core[coreIndex],
      balance[balanceIndex],
      seasoning[seasoningIndex],
    ]);
  };

  const handleRightClick = (
    ingredients: string[],
    index: number,
    setIndex: (index: number) => void,
  ) => {
    if (index >= ingredients.length - 1) return;
    setIndex(index + 1);
  };

  const handleLeftClick = (
    ingredients: string[],
    index: number,
    setIndex: (index: number) => void,
  ) => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  const handleButtonClick = () => {
    updateSelection();
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Find cocktails</Button>
      <Box position="relative" zIndex={1} width="100%">
        <Image
          src={shaker}
          mt="3%"
          height="85vh"
          width="100%"
          position="absolute"
          zIndex={2}
        />

        <Flex position="relative" zIndex={3} justifyContent="center" pt="15vh">
          <IconButton
            aria-label="Change index"
            icon={<ChevronLeftIcon fontSize="3xl" />}
            height="10vh"
            background="white"
            onClick={() => {
              handleLeftClick(seasoning, seasoningIndex, setSeasoningIndex);
            }}
          />
          <Box
            width="60%"
            height="10vh"
            background="white"
            textAlign="center"
            fontSize="3vw"
            fontFamily="heading"
            textTransform="uppercase"
            pt="1%"
          >
            {seasoning.length > 0 ? seasoning[seasoningIndex].name : ''}
          </Box>
          <IconButton
            aria-label="Change index"
            icon={<ChevronRightIcon fontSize="3xl" />}
            height="10vh"
            background="white"
            onClick={() => {
              handleRightClick(seasoning, seasoningIndex, setSeasoningIndex);
            }}
          />
        </Flex>
        <Flex position="relative" zIndex={3} justifyContent="center" pt="15vh">
          <IconButton
            aria-label="Change index"
            icon={<ChevronLeftIcon fontSize="3xl" />}
            height="10vh"
            background="white"
            onClick={() => {
              handleLeftClick(balance, balanceIndex, setBalanceIndex);
            }}
          />
          <Box
            width="60%"
            height="10vh"
            background="white"
            textAlign="center"
            fontSize="3vw"
            fontFamily="heading"
            textTransform="uppercase"
            pt="1%"
          >
            {balance.length > 0 ? balance[balanceIndex].name : ''}
          </Box>
          <IconButton
            aria-label="Change index"
            icon={<ChevronRightIcon fontSize="3xl" />}
            height="10vh"
            background="white"
            onClick={() => {
              handleRightClick(balance, balanceIndex, setBalanceIndex);
            }}
          />
        </Flex>
        <Flex position="relative" zIndex={3} justifyContent="center" pt="12vh">
          <IconButton
            aria-label="Change index"
            icon={<ChevronLeftIcon fontSize="3xl" />}
            height="10vh"
            background="white"
            onClick={() => {
              handleLeftClick(core, coreIndex, setCoreIndex);
            }}
          />
          <Box
            width="60%"
            height="10vh"
            background="white"
            textAlign="center"
            fontSize="3vw"
            fontFamily="heading"
            textTransform="uppercase"
            pt="1%"
          >
            {core.length > 0 ? core[coreIndex].name : ''}
          </Box>
          <IconButton
            aria-label="Change index"
            icon={<ChevronRightIcon fontSize="3xl" />}
            height="10vh"
            background="white"
            onClick={() => {
              handleRightClick(core, coreIndex, setCoreIndex);
            }}
          />
        </Flex>
      </Box>
    </>
  );
};

export default CocktailShaker;
