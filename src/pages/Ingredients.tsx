import React, { useContext, useEffect, useState } from 'react';
import { BoozeContext } from '../Context';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import IngredientSearch from '../components/IngredientSearch';
import { Ingredient } from '../interfaces';

const Ingredients: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  let ingredients: Ingredient[] = [];
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
  const [category, setCategory] = useState<string | string[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    ingredients,
  );

  useEffect(() => {
    const updatedIngredients = filterIngredients(ingredients, category);
    setFilteredIngredients(updatedIngredients);
  }, [category]);

  const filterIngredients = (
    ingredients: Ingredient[],
    category: string | string[],
  ) => {
    const filteredIngredients = ingredients
      .filter((ingredient) => category.includes(ingredient.barCategory))
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    return filteredIngredients;
  };

  const handleSelect = (category: string | string[]) => {
    setCategory(category);
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
          category={category}
          handleSelect={handleSelect}
          clearCategories={() => setCategory([])}
        />
        <CardDetailList
          ingredients={category.length > 0 ? filteredIngredients : ingredients}
        />
      </div>
    </>
  );
};

export default Ingredients;
