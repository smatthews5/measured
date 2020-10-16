import React, { useEffect, useState, useContext } from 'react';
import { BoozeContext } from '../Context';
import { useParams } from '@reach/router';

import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';
import { Cocktail } from '../interfaces';
import { Divider } from '@chakra-ui/core';

import { removeDuplicatesAndRankResults } from '../utilities';

const SearchResults = () => {
  const { query } = useParams();
  const { booze, setBooze } = useContext(BoozeContext);
  const [results, setResults] = useState<Cocktail[]>([]);

  const getMatches = async (baseArray: string[], categoryArray: string[]) => {
    try {
      const matchBases = booze?.cocktails.filter((cocktail) =>
        baseArray.includes(cocktail.base),
      );
      const matchCategories = booze?.cocktails.filter((cocktail) =>
        cocktail.categories.some((categoryName) =>
          categoryArray.includes(categoryName),
        ),
      );
      const allMatches = [...matchBases, ...matchCategories];
      const rankedMatches = removeDuplicatesAndRankResults(allMatches);
      setResults(rankedMatches);
    } catch (error) {
      console.log('---> error getting cocktails by base/category', error);
    }
  };

  // PAGE DOES NOT LOAD IF HOME PAGE HAS NOT YET BEEN ACCESSED??
  useEffect(() => {
    const [bases, categories] = query.split('_');
    const baseArray = bases.split('+');
    const categoryArray = categories.split('+');
    if (booze?.cocktails.length) getMatches(baseArray, categoryArray);
  }, [query]);

  return (
    <>
      <Header />
      <Divider />
      <Search />
      <CardGrid cocktails={results.length ? results : []} />
    </>
  );
};

export default SearchResults;
