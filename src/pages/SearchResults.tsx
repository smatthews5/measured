import React, { useEffect, useState, useContext } from 'react';
import { BoozeContext } from '../Context';
import { useParams } from '@reach/router';

import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';
import { Cocktail } from '../interfaces';
import { Divider } from '@chakra-ui/core';

import { removeDuplicatesAndRankResults, splitAndSearch } from '../utilities';

const SearchResults = () => {
  const { query } = useParams();
  const { booze } = useContext(BoozeContext);
  const [results, setResults] = useState<Cocktail[]>([]);

  const getMatches = async (
    baseArray: string[],
    categoryArray: string[],
    searchTermsArray: string[],
  ) => {
    try {
      const matchBases = booze?.cocktails.filter((cocktail) =>
        baseArray.includes(cocktail.base),
      );
      const matchCategories = booze?.cocktails.filter((cocktail) =>
        cocktail.categories.some((categoryName) =>
          categoryArray.includes(categoryName),
        ),
      );
      const matchSearchTerms = booze?.cocktails.filter(
        (cocktail) => splitAndSearch(cocktail, searchTermsArray) > 0,
      );
      const allMatches = [
        ...matchBases,
        ...matchCategories,
        ...matchSearchTerms,
      ];
      console.log('---> allMatches', allMatches);
      const rankedMatches = removeDuplicatesAndRankResults(allMatches);
      setResults(rankedMatches);
    } catch (error) {
      console.log('---> error getting cocktails by base/category', error);
    }
  };

  useEffect(() => {
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
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Search existingSearch={query} />
        <CardGrid
          cocktails={
            results.length ? results : booze?.cocktails ? booze.cocktails : []
          }
          title="Search results"
        />
      </div>
    </>
  );
};

export default SearchResults;
