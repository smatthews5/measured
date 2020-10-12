import React, { useContext } from 'react';
import { BoozeContext } from '../Context';
import Card from '../components/Card';
import { Box, Flex, Text } from '@chakra-ui/core';
import {Cocktail} from '../interfaces';

const CardGallery: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  console.log('booze',booze);
  
  return (
    <>
      <Box w="82vw" mx="auto" mt="2vh">
        <Text pl="2vw" fontSize="lg">
          All Cocktails
        </Text>
        <Flex overflowX="scroll">
          {booze ? booze.cocktails.map((cocktail: Cocktail) => (
            <Card cocktail={cocktail} key={cocktail.id} />
          )) : null }
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
