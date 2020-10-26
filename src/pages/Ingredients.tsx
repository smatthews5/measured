import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';
import { useLocation } from '@reach/router';

import { Divider } from '@chakra-ui/core';

import MartiniLoadingScreen from '../components/MartiniLoadingScreen';
import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import IngredientSearch from '../components/IngredientSearch';
import { Ingredient } from '../interfaces';

const Ingredients: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const location: any = useLocation();
  const { category } = location.state;

  const [isLoading, toggleLoading] = useState(true);
  const initialValue = category === undefined ? [] : [category];
  const [searchTerms, setSearchTerms] = useState<string[]>(initialValue);
  let ingredients: Ingredient[] = [];
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    ingredients,
  );

  if (booze)
    ingredients = booze.ingredients.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    );

  const barCategories = [
    'spirit',
    'liqueur',
    'wine & vermouth',
    'fresh',
    'pantry',
  ];

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        toggleLoading(false);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    const updatedIngredients = filterIngredients(ingredients, searchTerms);
    setFilteredIngredients(updatedIngredients);
  }, [searchTerms, category, ingredients]);

  const filterIngredients = (
    ingredients: Ingredient[],
    searchTerms: string[],
  ) => {
    const filteredIngredients = ingredients
      .filter((ingredient) => searchTerms.includes(ingredient.barCategory))
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    return filteredIngredients;
  };

  const handleSelect = (searchTerms: string[]) => {
    setSearchTerms(searchTerms);
  };

  return (
    <>
      <div id="fixed">
        {isLoading ? (
          <div id="loading">
            <MartiniLoadingScreen />
          </div>
        ) : null}
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
