import React from 'react';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import CardGallery from '../containers/CardGallery';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';

const MyBar: React.FC = () => {
  return (
    <>
      <Header />
      <Divider />
      <>
        <CardGallery cocktails={[]} categoryHeading="my ingredients" />
        <CardDetailList ingredients={[]} />
      </>
      <>
        <CardSuggestionContainer />
      </>
    </>
  );
};

export default MyBar;
