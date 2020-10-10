import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { RouteComponentProps } from '@reach/router';

import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';
import { collectIdsAndDocs } from '../utilities';

interface Cocktail {
  name: string
  category: string
  base: string
  ingredientList: string[]
}

const Home = (_props: RouteComponentProps) => {

  const [cocktails, setCocktails] = useState<Cocktail[]>([])

  useEffect(() => {
    firestore.collection('cocktails').onSnapshot(snapshot => {
      const cocktailData: Cocktail[] = snapshot.docs.map(collectIdsAndDocs);
      setCocktails(cocktailData);
    })
  }, []);

  console.log(cocktails)

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
