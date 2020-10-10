import React, { useEffect } from 'react';
import { firestore } from '../firebase';
import { RouteComponentProps } from '@reach/router';

import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';

const Home = (_props: RouteComponentProps) => {
  const getCocktails = async () => {
    const snapshot = await firestore.collection('cocktails').get();

    snapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      console.log({ id, data });
    });

    console.log('hello');
  };

  useEffect(() => {
    getCocktails();
  }, []);

  return (
    <>
      <h1>Measured</h1>
      <HeaderLarge />
      <Banner />
      <Search />
      <CardGallery />
    </>
  );
};

export default Home;
