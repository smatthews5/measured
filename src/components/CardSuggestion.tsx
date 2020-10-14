import React from 'react';
import { Flex, Image } from '@chakra-ui/core';

const CardSuggestion: React.FC = ({ cocktails }) => {

  return (
    <Flex direction="column">
      {cocktails.map((cocktail, index: number) => (
        <Flex key={index} direction="column" alignContent='center' justify='center'>
        <Image src={cocktail.imageUrl} height="20%" width="20%"/>
        <Flex >{cocktail.name}</Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CardSuggestion;
