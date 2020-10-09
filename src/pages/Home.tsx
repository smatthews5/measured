import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { firestore } from '../firebase';

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
    </>
  );
};

export default Home;
