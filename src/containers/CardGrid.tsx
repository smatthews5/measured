import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { Flex, Heading } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';
import Card from '../components/Card';

interface CardGridProps extends RouteComponentProps {
  cocktails: Cocktail[];
}

const CardGrid: React.FC<CardGridProps> = ({ cocktails }) => {
  return (
    <>
      {
        cocktails.length > 0 ? (
          <>
            <Heading as="h3" mx={8}>
              Search results
            </Heading>
            <Flex
              wrap="wrap"
              mx="auto"
              width="80vw"
              justify="center"
              align="center"
            >
              {cocktails.map((cocktail: Cocktail) => (
                <Card cocktail={cocktail} key={cocktail.id} />
              ))}
            </Flex>
          </>
        ) : null
        // <Heading as="h3" color="purple.400" mx={8}>

        // </Heading>
      }
    </>
  );
};

export default CardGrid;
