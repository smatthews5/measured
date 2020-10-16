import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';
import { Flex, Image, Box, IconButton, Button } from '@chakra-ui/core';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import shaker from '../assets/images/shaker.jpg';

import { RouteComponentProps } from '@reach/router';
import { Ingredient } from '../interfaces';

interface CocktailShakerProps extends RouteComponentProps {
  seasoning: Ingredient[];
  balance: Ingredient[];
  core: Ingredient[];
  seasoningIndex: number;
  balanceIndex: number;
  coreIndex: number;
  handleButtonClick: () => void;
  setSeasoningIndex: (index: number) => void;
  setBalanceIndex: (index: number) => void;
  setCoreIndex: (index: number) => void;
  handleLeftClick: (
    ingredients: Ingredient[],
    index: number,
    setIndex: (index: number) => void,
  ) => void;
  handleRightClick: (
    ingredients: Ingredient[],
    index: number,
    setIndex: (index: number) => void,
  ) => void;
}

const CocktailShaker: React.FC<CocktailShakerProps> = ({
  seasoning,
  balance,
  core,
  seasoningIndex,
  balanceIndex,
  coreIndex,
  handleButtonClick,
  setSeasoningIndex,
  setBalanceIndex,
  setCoreIndex,
  handleLeftClick,
  handleRightClick,
}) => {
  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        zIndex={1}
        width="100%"
      >
        <Image
          src={shaker}
          mt="3%"
          height="85vh"
          width="auto"
          position="absolute"
          zIndex={2}
        />

        <Flex position="relative" zIndex={3} justifyContent="center" pt="28vh">
          <IconButton
            aria-label="Change index"
            icon={<ChevronLeftIcon fontSize="3xl" />}
            height="8vh"
            background="white"
            onClick={() => {
              handleLeftClick(seasoning, seasoningIndex, setSeasoningIndex);
            }}
          />
          <Box
            width="18vw"
            height="8vh"
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
            height="8vh"
            background="white"
            onClick={() => {
              handleRightClick(seasoning, seasoningIndex, setSeasoningIndex);
            }}
          />
        </Flex>
        <Flex position="relative" zIndex={3} justifyContent="center" pt="2vh">
          <IconButton
            aria-label="Change index"
            icon={<ChevronLeftIcon fontSize="3xl" />}
            height="8vh"
            background="white"
            onClick={() => {
              handleLeftClick(balance, balanceIndex, setBalanceIndex);
            }}
          />
          <Box
            width="18vw"
            height="8vh"
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
            height="8vh"
            background="white"
            onClick={() => {
              handleRightClick(balance, balanceIndex, setBalanceIndex);
            }}
          />
        </Flex>
        <Flex position="relative" zIndex={3} justifyContent="center" pt="2vh">
          <IconButton
            aria-label="Change index"
            icon={<ChevronLeftIcon fontSize="3xl" />}
            height="8vh"
            background="white"
            onClick={() => {
              handleLeftClick(core, coreIndex, setCoreIndex);
            }}
          />
          <Box
            width="18vw"
            height="8vh"
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
            height="8vh"
            background="white"
            onClick={() => {
              handleRightClick(core, coreIndex, setCoreIndex);
            }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default CocktailShaker;
