import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import Header from '../components/Header';
import CocktailShaker from '../components/CocktailShaker';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';
import { Box, Divider, Flex } from '@chakra-ui/core';
import { Ingredient } from '../interfaces';
import { GiLevelThree } from 'react-icons/gi';

const DrinkBuilder: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const cocktails = booze.cocktails;
  const ingredients = booze.ingredients;

  const [selection, setSelection] = useState([]);
  const [content, setContent] = useState([]);

  const [seasoningIndex, setSeasoningIndex] = useState(0);
  const [balanceIndex, setBalanceIndex] = useState(0);
  const [coreIndex, setCoreIndex] = useState(0);

  useEffect(() => {
    console.log(selection);
    const newCocktails = filterCocktails(selection);
    setContent(newCocktails);
    console.log(newCocktails);
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
    let filteredCocktails = [];
    for (let i = 0; i < cocktails.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        if (cocktails[i].ingredientsList.includes(filters[j])) {
          counter++;
        }
      }
      if (counter > 0) {
        filteredCocktails.push(cocktails[i]);
        counter = 0;
      }
    }
    return filteredCocktails;
  };

  return (
    <>
      <Header />
      <Divider />
      <Flex>
        <Box width="50vw">
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
        </Box>
        <Box width="50vw" borderLeft="0.5px solid lightGray" pl="5%" h="100%">
          <CardSuggestionContainer cocktails={content} />
        </Box>
      </Flex>
    </>
  );
};

export default DrinkBuilder;
