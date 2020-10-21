import React, { useEffect, useState, useContext } from 'react';
import { BoozeContext, UserContext } from '../Context';
import { navigate } from '@reach/router';

import Header from '../components/Header';
import CardGrid from '../containers/CardGrid';
import { Cocktail } from '../interfaces';
import { Box, Divider } from '@chakra-ui/core';

const TopShelf = () => {
  const { booze } = useContext(BoozeContext);
  const { user } = useContext(UserContext);
  const [userFavourites, setUserFavourites] = useState<Cocktail[]>([]);

  useEffect(() => {
    if (!user) navigate('/');
    else if (booze) {
      setUserFavourites(
        booze.cocktails.filter((cocktail) =>
          user.likedDrinks.includes(cocktail.name),
        ),
      );
    }
  }, [user]);

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Box mt={8}>
          <CardGrid
            cocktails={userFavourites}
            title="Top shelf — my favourites"
          />
        </Box>
      </div>
    </>
  );
};

export default TopShelf;
