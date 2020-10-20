import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { Flex, Heading } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';
import Card from '../components/Card';

interface CardGridProps extends RouteComponentProps {
  title: string;
  cocktails: Cocktail[];
}

const CardGrid: React.FC<CardGridProps> = ({ cocktails, title }) => {
  return (
    <>
      {cocktails.length > 0 ? (
        <>
          <Flex width="100%" justify="center">
            <Heading as="h3" pb={8}>
              {title}
            </Heading>
          </Flex>
          <Flex
            wrap="wrap"
            mx="auto"
            paddingLeft={8}
            width="80vw"
            justify="center"
            align="center"
          >
            {cocktails.map((cocktail: Cocktail) => (
              <Card content={cocktail} key={cocktail.id} />
            ))}
          </Flex>
        </>
      ) : null}
    </>
  );
};

export default CardGrid;
