import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { RouteComponentProps } from '@reach/router';

import Header from '../components/Header';
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

const Home: React.FC = (_props: RouteComponentProps) => {

  const [cocktails, setCocktails] = useState<Cocktail[]>([])

  useEffect(() => {
    let unsubscribe = firestore.collection('cocktails').onSnapshot(snapshot => {
      const cocktailData: Cocktail[] = snapshot.docs.map(collectIdsAndDocs);
      setCocktails(cocktailData);
    })

    return unsubscribe
  }, []);

  console.log(cocktails)

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
