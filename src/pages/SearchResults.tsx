import React, { useEffect, useState, useContext } from 'react';
import { BoozeContext } from '../Context';
import { useParams } from '@reach/router';

import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';
import { Cocktail } from '../interfaces';
import { Divider } from '@chakra-ui/core';
import CocktailLoadingScreen from '../components/CocktailLoadingScreen';

import { removeDuplicatesAndRankResults, splitAndSearch } from '../utilities';

const SearchResults = () => {
  const { query } = useParams();
  const { booze } = useContext(BoozeContext);
  const [results, setResults] = useState<Cocktail[]>([]);
  const [isLoading, toggleLoading] = useState(true);

  let cocktails: Cocktail[] = [];
  if (booze) {
    cocktails = booze.cocktails;
  }

  const getMatches = async (
    baseArray: string[],
    categoryArray: string[],
    searchTermsArray: string[],
  ) => {
    try {
      const matchBases = cocktails.filter((cocktail) =>
        baseArray.includes(cocktail.base),
      );
      const matchCategories = cocktails.filter((cocktail) =>
        cocktail.categories.some((categoryName) =>
          categoryArray.includes(categoryName),
        ),
      );
      const matchSearchTerms = cocktails.filter(
        (cocktail) => splitAndSearch(cocktail, searchTermsArray) > 0,
      );
      const allMatches = [
        ...matchBases,
        ...matchCategories,
        ...matchSearchTerms,
      ];
      const rankedMatches = removeDuplicatesAndRankResults(allMatches);
      setResults(rankedMatches);
    } catch (error) {
      console.error('---> error getting cocktails by base/category', error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        toggleLoading(false);
      }, 1500);
    }
    const [bases, categories, searchTerms] = query.split('_');
    const baseArray = decodeURI(bases).split('+');
    const categoryArray = decodeURI(categories).split('+');
    const searchTermsArray = decodeURI(searchTerms).split(' ');
    if (booze?.cocktails.length)
      getMatches(baseArray, categoryArray, searchTermsArray);
  }, [query, booze]);

  return (
    <>
      <div id="fixed">
        {isLoading ? (
          <div id="loading">
            <CocktailLoadingScreen />
          </div>
        ) : null}
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Search existingSearch={query} />
        <CardGrid
          cocktails={
            results.length ? results : booze?.cocktails ? booze.cocktails : []
          }
          title={
            results.length
              ? 'Search results'
              : 'No exact matches. Our whole collection below:'
          }
        />
      </div>
    </>
  );
};

export default SearchResults;
