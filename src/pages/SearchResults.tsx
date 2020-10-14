import React, { useContext, useEffect } from 'react';
import { BoozeContext } from '../Context';

import { navigate } from '@reach/router';


import Header from '../components/Header';
import Search from '../components/Search';
import CardGrid from '../containers/CardGrid';

function SearchResults({searchQuery}) {
  const { booze } = useContext(BoozeContext);
  // dynamically display card grid
console.log('searchQuery', searchQuery);

// useEffect(() => {
  
 
// },[]);

  return (
    <>
      <Header />
      <Search />
      <CardGrid cocktails={booze?.search.results.length? booze.search.results : booze.cocktails} searchTerms={booze.search.query} />
    </>
  );
}

export default SearchResults;
