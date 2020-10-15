import React, { useEffect, useState, useContext } from 'react';
import { BoozeContext } from '../Context';
import { useParams } from '@reach/router';

import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';
import { Cocktail, Relevance } from '../interfaces';
import { Divider } from '@chakra-ui/core';

import {
  getMatchingCocktailsByBase,
  getMatchingCocktailsByCategory,
} from '../services/firebase';

const SearchResults = () => {
  const { query } = useParams();
  const { booze } = useContext(BoozeContext);
  const [results, setResults] = useState<Cocktail[]>([]);

  const rankResults = (allMatches: Cocktail[]) => {
    try {
      const relevance: Relevance = {};
      const uniqueCocktails: Cocktail[] = [];
      allMatches.forEach((cocktail) => {
        if (relevance[cocktail.id]) {
          relevance[cocktail.id]++;
        } else {
          relevance[cocktail.id] = 1;
          uniqueCocktails.push(cocktail);
        }
      });
      const rankedCocktails = uniqueCocktails
        .map((cocktail) => ({
          ...cocktail,
          relevance: relevance[cocktail.id],
        }))
        .sort((a, b) => b.relevance - a.relevance);
      return rankedCocktails;
    } catch (error) {
      console.log('---> error ranking and removing duplicates', error);
    }
  };

  const getMatches = async (baseArray: string[], categoryArray: string[]) => {
    try {
      const matchBases = await getMatchingCocktailsByBase(baseArray);
      const matchCategories = await getMatchingCocktailsByCategory(
        categoryArray,
      );
      const allMatches = [...matchBases, ...matchCategories];
      const rankedMatches = rankResults(allMatches);
      setResults(rankedMatches);
    } catch (error) {
      console.log('---> error getting cocktails by base/category', error);
    }
  };

  useEffect(() => {
    const [bases, categories] = query.split('_');
    const baseArray = bases.split('+');
    const categoryArray = categories.split('+');
    getMatches(baseArray, categoryArray);
  }, [query]);

  return (
    <>
      <Header />
      <Divider />
      <Search />
      <CardGrid cocktails={results.length ? results : booze.cocktails} />
    </>
  );
};

export default SearchResults;
