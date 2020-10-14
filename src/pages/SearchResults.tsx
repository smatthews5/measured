import React, { useContext, useEffect } from 'react';
import { BoozeContext } from '../Context';

import { navigate } from '@reach/router';


import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';

const SearchResults: React.FC = ({searchQuery}) => {
  const { booze } = useContext(BoozeContext);
  return (
    <>
      <Header />
      <Search />
      <CardGrid cocktails={booze?.search.results.length? booze.search.results : booze.cocktails} searchTerms={booze.search.query} />
    </>
  );
};

export default SearchResults;
