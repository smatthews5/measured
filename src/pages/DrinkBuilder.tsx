import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import { Box, Divider, Flex, Button } from '@chakra-ui/core';
import { Cocktail, Ingredient } from '../interfaces';
import BuilderSuggestionContainer from '../containers/BuilderSuggestionContainer';
// import CardSuggestionContainer from '../containers/CardSuggestionContainer';

const responsiveFontButton = ['8px', '12px', '14px', '16px'];
const responsiveButtonHeight = ['20px', '30px', '40px'];

const DrinkBuilder: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const cocktails = booze?.cocktails;
  const ingredients = booze?.ingredients;

  const [selection, setSelection] = useState<string[]>([]);
  const [content, setContent] = useState<Cocktail[]>([]);

  const [seasoningIndex, setSeasoningIndex] = useState<number>(0);
  const [balanceIndex, setBalanceIndex] = useState<number>(0);
  const [coreIndex, setCoreIndex] = useState<number>(0);

  useEffect(() => {
    const newCocktails: Cocktail[] = filterCocktails(selection);
    setContent(newCocktails.sort((a, b) => b.relevance - a.relevance));
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
      core[coreIndex].name,
      balance[balanceIndex].name,
      seasoning[seasoningIndex].name,
    ]);
  };

  const handleRightClick = (
    ingredients: Ingredient[],
    index: number,
    setIndex: (index: number) => void,
  ) => {
    if (index >= ingredients.length - 1) return;
    setIndex(index + 1);
  };

  const handleLeftClick = (
    ingredients: Ingredient[],
    index: number,
    setIndex: (index: number) => void,
  ) => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  const handleButtonClick = () => {
    updateSelection();
  };

  const filterCocktails = (filters: string[]) => {
    let counter = 0;
    const filteredCocktails: Cocktail[] = [];
    for (let i = 0; i < cocktails.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        if (cocktails[i].ingredientsList.includes(filters[j])) {
          counter++;
        }
      }
      if (counter > 0) {
        cocktails[i].relevance = counter;
        filteredCocktails.push(cocktails[i]);
        counter = 0;
      }
    }
    return filteredCocktails;
  };

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Flex>
          <Flex width="50vw" direction="column">
            <CocktailShaker
              seasoning={seasoning}
              balance={balance}
              core={core}
              seasoningIndex={seasoningIndex}
              balanceIndex={balanceIndex}
              coreIndex={coreIndex}
              handleButtonClick={handleButtonClick}
              setSeasoningIndex={setSeasoningIndex}
              setBalanceIndex={setBalanceIndex}
              setCoreIndex={setCoreIndex}
              handleLeftClick={handleLeftClick}
              handleRightClick={handleRightClick}
            />
            <Button
              w="60%"
              my="3%"
              ml="20%"
              onClick={handleButtonClick}
              variant="unstyled"
              bgColor="purple.400"
              color="white"
              fontSize={responsiveFontButton}
              height={responsiveButtonHeight}
              zIndex={4}
            >
              Find cocktails
            </Button>
          </Flex>
          <Box
            width="50vw"
            borderLeft="0.5px solid lightGray"
            px="5%"
            pt="2%"
            h="85vh"
            overflowX="scroll"
          >
            <BuilderSuggestionContainer
              cocktails={content}
              selection={selection}
            />
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default DrinkBuilder;
