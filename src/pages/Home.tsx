import React, { useContext, useState, useEffect } from 'react';
import { BoozeContext, UserContext } from '../Context';

import Header from '../components/Header';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';
import { Divider } from '@chakra-ui/core';

import LoadingScreen from './LoadingScreen';

const Home: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);
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
            <Header />
            <Divider />
          </div>
          <div id="scroll-large">
            <Banner />
            <Search existingSearch={''} />
            {user && user.likedDrinks.length ? (
              <CardGallery
                content={booze.cocktails.filter((cocktail) =>
                  user.likedDrinks.includes(cocktail.name),
                )}
                categoryHeading="top shelf — my favourites"
              />
            ) : null}
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
