import React, { useContext } from 'react';
import { BoozeContext } from '../Context';
import Card from '../components/Card';
import { Box, Heading, Flex } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';

const CardGallery: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  return (
    <>
      <Box w="82vw" mx="auto" mt="2vh">
<<<<<<< HEAD
        <Text pl="2vw" fontSize="lg">
          All Cocktails
        </Text>
        <Flex overflowX="scroll">
          {booze.cocktails.map((cocktail: Cocktail) => (
=======
      <Heading as="h3" fontFamily="mono" color="purple.400" pl="2vw">
      All Cocktails
      </Heading>
      <Flex overflowX='scroll'>
          {booze?.cocktails.map((cocktail: Cocktail) => (
>>>>>>> edffd51a60152f2cfd8d37b37d910571f1e318bb
            <Card cocktail={cocktail} key={cocktail.id} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
