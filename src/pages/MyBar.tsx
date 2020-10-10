import React from 'react';

import Header from '../components/Header';
import CardDetailList from '../containers/CardDetailList';
import CardGallery from '../containers/CardGallery';
import CardSuggestionContainer from '../containers/CardSuggestionContainer';

function MyBar() {
  return (
    <>
      <Header />
      <>
        <CardGallery />
        <CardDetailList />
      </>
      <>
        <CardSuggestionContainer />
      </>
    </>
  );
}

export default MyBar;
