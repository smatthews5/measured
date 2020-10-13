import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { Grid, Heading } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';
import Card from '../components/Card';

interface CardGridProps extends RouteComponentProps {
  cocktails: Cocktail[];
  searchTerms: string;
}

const CardGrid: React.FC<CardGridProps> = ({ cocktails, searchTerms }) => {
  return (
    <>
      {cocktails ? (
        <>
          <Heading as="h3" mx={8}>
            {searchTerms}
          </Heading>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            mx="auto"
            width="80vw"
            mt={8}
          >
            {cocktails.map((cocktail: Cocktail) => (
              <Card cocktail={cocktail} key={cocktail.id} />
            ))}
          </Grid>
        </>
      ) : (
        <Heading as="h3" color="purple.400" mx={8}>
          No results
        </Heading>
      )}
    </>
  );
};

export default CardGrid;
