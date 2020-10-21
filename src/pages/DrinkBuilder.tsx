import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import { Box, Divider, Flex, Button } from '@chakra-ui/core';
import { Cocktail, Ingredient } from '../interfaces';
import BuilderSuggestionContainer from '../containers/BuilderSuggestionContainer';
import BuilderInstructions from '../containers/BuilderInstructions';

const responsiveFontButton = ['8px', '12px', '14px', '16px'];
const responsiveButtonHeight = ['20px', '30px', '40px'];

const DrinkBuilder: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  let cocktails: Cocktail[] = [];
  let ingredients: Ingredient[] = [];
  if (booze) {
    cocktails = booze.cocktails;
    ingredients = booze.ingredients;
  }

  const [selection, setSelection] = useState<string[]>([]);
  const [content, setContent] = useState<Cocktail[]>([]);

  const [seasoningIndex, setSeasoningIndex] = useState<number>(0);
  const [balanceIndex, setBalanceIndex] = useState<number>(0);
  const [coreIndex, setCoreIndex] = useState<number>(0);

  useEffect(() => {
    const newCocktails = filterCocktails(selection);
    const sortedCocktails = newCocktails.sort(
      (a, b) => b.relevance - a.relevance,
    );
    setContent(sortedCocktails);
  }, [selection]);

  const seasoning = ingredients.filter((ingredient) =>
    ingredient.builder.includes('seasoning' || 'garnish'),
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
        <Flex
          width="100%"
          direction={['column', 'column', 'column', 'row']}
          h="88vh"
          overflowY="scroll"
        >
          <Flex
            width={['100%', '100%', '100%', '50%']}
            direction="column"
            align="center"
          >
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
            <Flex align="center" justify="center" py={4} w="80%">
              <Button
                w="60%"
                h="55px"
                mx={2}
                onClick={handleButtonClick}
                variant="unstyled"
                bgColor="purple.400"
                color="white"
                fontSize={responsiveFontButton}
                height={responsiveButtonHeight}
                zIndex={4}
              >
                What can I build?
              </Button>
              {selection.length ? (
                <Button
                  w="30%"
                  h="55px"
                  mx={2}
                  onClick={() => setSelection([])}
                  variant="outline"
                  color="purple.400"
                  borderColor="purple.400"
                  fontSize={responsiveFontButton}
                  height={responsiveButtonHeight}
                  zIndex={4}
                >
                  Back to instructions
                </Button>
              ) : null}
            </Flex>
          </Flex>
          <Flex
            width={['100%', '100%', '100%', '50%']}
            borderLeft="0.5px solid gray.400"
          >
            {selection.length === 0 ? (
              <BuilderInstructions />
            ) : (
              <BuilderSuggestionContainer
                cocktails={content}
                selection={selection}
              />
            )}
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default DrinkBuilder;
