import React from 'react';
import { Flex, Image, Box, IconButton, Heading } from '@chakra-ui/core';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import shaker from '../assets/images/shaker.jpg';

import { RouteComponentProps } from '@reach/router';
import { Ingredient } from '../interfaces';

//TODO: Make page responsive

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
  setSeasoningIndex,
  setBalanceIndex,
  setCoreIndex,
  handleLeftClick,
  handleRightClick,
}) => {
  const responsiveFontSize = ['2xl', '2xl', '3xl', '3xl'];
  const responsiveBoxSize = ['', '', '', ''];

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        zIndex={1}
        width="100%"
        height="75vh"
      >
        <Image
          src={shaker}
          height="100%"
          width="auto"
          minWidth="350px"
          position="absolute"
          zIndex={2}
        />

        <Flex
          zIndex={3}
          align="space-between"
          justify="space-between"
          direction="column"
          pt="10%"
          w="80%"
          minWidth="300px"
          h="50%"
        >
          <Flex
            zIndex={3}
            justify="space-between"
            align="center"
            height="7vh"
            bg="white"
          >
            <IconButton
              aria-label="Change index"
              icon={<ChevronLeftIcon fontSize="3xl" />}
              onClick={() => {
                handleLeftClick(seasoning, seasoningIndex, setSeasoningIndex);
              }}
            />
            <Heading textAlign="center" fontSize={responsiveFontSize} pb={3}>
              {seasoning.length > 0 ? seasoning[seasoningIndex].name : ''}
            </Heading>
            <IconButton
              aria-label="Change index"
              icon={<ChevronRightIcon fontSize="3xl" />}
              onClick={() => {
                handleRightClick(seasoning, seasoningIndex, setSeasoningIndex);
              }}
            />
          </Flex>
          <Flex
            zIndex={3}
            justify="space-between"
            align="center"
            height="7vh"
            bg="white"
          >
            <IconButton
              aria-label="Change index"
              icon={<ChevronLeftIcon fontSize="3xl" />}
              onClick={() => {
                handleLeftClick(balance, balanceIndex, setBalanceIndex);
              }}
            />
            <Heading textAlign="center" fontSize={responsiveFontSize} pb={3}>
              {balance.length > 0 ? balance[balanceIndex].name : ''}
            </Heading>
            <IconButton
              aria-label="Change index"
              icon={<ChevronRightIcon fontSize="3xl" />}
              onClick={() => {
                handleRightClick(balance, balanceIndex, setBalanceIndex);
              }}
            />
          </Flex>
          <Flex
            zIndex={3}
            justify="space-between"
            align="center"
            height="7vh"
            bg="white"
          >
            <IconButton
              aria-label="Change index"
              icon={<ChevronLeftIcon fontSize="3xl" />}
              onClick={() => {
                handleLeftClick(core, coreIndex, setCoreIndex);
              }}
            />
            <Heading textAlign="center" fontSize={responsiveFontSize} pb={3}>
              {core.length > 0 ? core[coreIndex].name : ''}
            </Heading>
            <IconButton
              aria-label="Change index"
              icon={<ChevronRightIcon fontSize="3xl" />}
              onClick={() => {
                handleRightClick(core, coreIndex, setCoreIndex);
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CocktailShaker;
