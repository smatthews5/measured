import React, { useContext, useState, useEffect } from 'react';
import { BoozeContext, UserContext } from '../Context';

import Header from '../components/Header';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';
import { Divider } from '@chakra-ui/core';

import MartiniLoadingScreen from '../components/MartiniLoadingScreen';
import { Cocktail } from '../interfaces';

const Home: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);
  const [isLoading, toggleLoading] = useState(true);

  let cocktails: Cocktail[] = [];
  let categories: string[] = [];
  if (booze) {
    cocktails = booze.cocktails;
    categories = booze.categories;
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        toggleLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
<<<<<<< HEAD
      {isLoading ? <LoadingScreen /> : null}
      <>
        <div id="fixed">
          <Header />
          <Divider />
        </div>
        <div id="scroll-large">
          <Banner />
          <Search existingSearch={''} />
          {user && user.likedDrinks.length ? (
=======
      <div id="fixed">
        {isLoading ? (
          <div id="loading">
            <MartiniLoadingScreen />
          </div>
        ) : null}
        <Header />
        <Divider />
      </div>
      <div id="scroll-large">
        <Banner />
        <Search existingSearch={''} />
        {user && user.likedDrinks.length ? (
          <CardGallery
            content={cocktails.filter((cocktail) =>
              user.likedDrinks.includes(cocktail.name),
            )}
            categoryHeading="top shelf — my favourites"
          />
        ) : null}
        <CardGallery content={cocktails} categoryHeading="all cocktails" />
        {categories.map((category) => {
          const categoryCocktails = cocktails.filter((cocktail) =>
            cocktail.categories.includes(category),
          );
          return (
>>>>>>> 45cd9d0c474f6b00a1b1f159006dc3607a8e70d0
            <CardGallery
              content={categoryCocktails}
              categoryHeading={category}
              key={category}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
