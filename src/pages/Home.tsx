import React, { useContext } from 'react';
import { BoozeContext } from '../Context';

import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';

const Home: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  return (
    <>
      <HeaderLarge />
      <Banner />
      <Search />
      {/* all cocktails array */}
      <CardGallery
        cocktails={booze.cocktails}
        categoryHeading="All cocktails"
      />
      {/* cocktails by category */}
    </>
  );
};

export default Home;
