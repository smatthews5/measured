import React, { useContext } from 'react';
import { BoozeContext } from '../Context';
import Card from '../components/Card';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';

const CardGallery: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  return (
    <>
      <Box w="82vw" mx="auto" mt="2vh">
        <Heading as="h3" fontFamily="mono" color="purple.400" pl="2vw">
          All Cocktails
        </Heading>
          {booze.cocktails.map((cocktail: Cocktail) => (
            <Card cocktail={cocktail} key={cocktail.id} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CardGallery;
