import React, { useContext } from 'react';
import { BoozeContext } from '../Context';

import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';

function SearchResults({merged}) {
  const { booze } = useContext(BoozeContext);
  // dynamically display card grid
  return (
    <>
      <Header />
      <Search />
      <CardGrid cocktails={merged} searchTerms="" />
    </>
  );
}

export default SearchResults;
