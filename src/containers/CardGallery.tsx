import React, { useContext } from 'react';
import { BoozeContext } from '../Context';
import Card from '../components/Card';
import { Flex } from '@chakra-ui/core';

const CardGallery: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  return (
    <>
      <Flex px="9%" overflowX="scroll">
        {booze.cocktails.map((cocktail) => (
          <Card cocktail={cocktail} key={cocktail.id} />
        ))}
      </Flex>
    </>
  );
};

export default CardGallery;
