import React, { useContext, useState, useEffect } from 'react';
import { BoozeContext } from '../Context';

import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';
import { Divider } from '@chakra-ui/core';

import LoadingScreen from './LoadingScreen';

const Home: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        toggleLoading(false);
      }, 1500);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div id="fixed">
            <HeaderLarge />
            <Divider />
          </div>
          <div id="scroll-large">
            <Banner />
            <Search existingSearch={''} />
            <CardGallery
              content={booze.cocktails}
              categoryHeading="all cocktails"
            />
            {booze.categories.map((category) => {
              const categoryCocktails = booze.cocktails.filter((cocktail) =>
                cocktail.categories.includes(category),
              );
              return (
                <CardGallery
                  content={categoryCocktails}
                  categoryHeading={category}
                  key={category}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
