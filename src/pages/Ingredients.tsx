import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';
import { useLocation } from '@reach/router';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import IngredientSearch from '../components/IngredientSearch';
import { Ingredient } from '../interfaces';

const Ingredients: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  let ingredients: Ingredient[] = [];
  if (booze) ingredients = booze.ingredients;
  const location = useLocation();

  const barCategories = [
    'spirit',
    'liqueur',
    'wine & vermouth',
    'fresh',
    'pantry',
  ];
  const { category } = location.state;
  const initialValue = category === undefined ? [] : [category];

  const [searchTerms, setSearchTerms] = useState<string | string[]>(initialValue);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    ingredients,
  );

  useEffect(() => {
    const updatedIngredients = filterIngredients(ingredients, searchTerms);
    setFilteredIngredients(updatedIngredients);
  }, [searchTerms, category, ingredients]);

  const filterIngredients = (
    ingredients: Ingredient[],
    searchTerms: string | string[],
  ) => {
    const filteredIngredients = ingredients.filter((ingredient) =>
      searchTerms.includes(ingredient.barCategory),
    );
    return filteredIngredients;
  };

  const handleSelect = (searchTerms: string | string[]) => {
    setSearchTerms(searchTerms);
  };

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <IngredientSearch
          barCategories={barCategories}
          category={searchTerms}
          handleSelect={handleSelect}
          clearCategories={() => setSearchTerms([])}
        />
        <CardDetailList
          ingredients={
            searchTerms.length > 0 ? filteredIngredients : ingredients
          }
        />
      </div>
    </>
  );
};

export default Ingredients;
