import { StackDivider, VStack } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';

import CardDetail from '../components/CardDetail';
import { Ingredient } from '../interfaces';

interface CardDetailListProps extends RouteComponentProps {
  ingredients: Ingredient[];
}

const CardDetailList: React.FC<CardDetailListProps> = ({ ingredients }) => {
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        width="70vw"
        mx="auto"
        my="3%"
      >
        {ingredients.map((ingredient) => (
          <CardDetail ingredient={ingredient} key={ingredient.id} />
        ))}
      </VStack>
    </>
  );
};

export default CardDetailList;
