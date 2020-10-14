import React, { useContext } from 'react';
import { BoozeContext } from '../Context';

import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';
import Header from '../components/Header';

const Home: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  return (
    <>
      <Header />
      <Banner />
      <Search />
      <CardGallery
        cocktails={booze.cocktails}
        categoryHeading="All cocktails"
      />
      {booze.categories.map((category) => {
        const categoryCocktails = booze.cocktails.filter((cocktail) =>
          cocktail.categories.includes(category),
        );
        return (
          <CardGallery
            cocktails={categoryCocktails}
            categoryHeading={category}
            key={category}
          />
        );
      })}
    </>
  );
};

export default Home;
