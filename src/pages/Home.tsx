import React, { useEffect } from 'react';
import { firestore } from '../firebase';
import { RouteComponentProps } from '@reach/router';

import Header from '../components/Header';
import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';

const Home: React.FC = (_props: RouteComponentProps) => {
  const getCocktails = async () => {
    const snapshot = await firestore.collection('cocktails').get();

    snapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      // eslint-disable-next-line no-console
      console.log({ id, data });
    });

    // eslint-disable-next-line no-console
    console.log('hello');
  };

  useEffect(() => {
    getCocktails();
  }, []);

  return (
    <>
      <Header />
      <HeaderLarge />
      <Banner />
      <Search />
      <CardGallery />
    </>
  );
};

export default Home;
