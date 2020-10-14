import { StackDivider, VStack } from '@chakra-ui/core';
import React from 'react';

import CardDetail from '../components/CardDetail';

const CardDetailList: React.FC = () => {
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <CardDetail />
        <CardDetail />
        <CardDetail />
      </VStack>
    </>
  );
};

export default CardDetailList;
