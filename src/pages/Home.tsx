import React from 'react';
import { RouteComponentProps } from '@reach/router';

import HeaderLarge from '../components/HeaderLarge';
import Banner from '../components/Banner';
import Search from '../components/Search';
import CardGallery from '../containers/CardGallery';

const Home: React.FC = () => {
  return (
    <>
      <HeaderLarge />
      <Banner />
      <Search />
      <CardGallery />
    </>
  );
};

export default Home;
