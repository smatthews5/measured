import React from 'react';

import Header from '../components/Header';
import Search from '../components/Search';
import CardDetailList from '../containers/CardDetailList';

const Ingredients: React.FC = () => {
  return (
    <>
      <Header />
      <Search />
      <CardDetailList />
    </>
  );
};

export default Ingredients;
