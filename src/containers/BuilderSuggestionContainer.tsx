import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import { Cocktail } from '../interfaces';
import { RouteComponentProps, Link } from '@reach/router';
import BuilderSuggestion from '../components/BuilderSuggestion';

interface BuilderSuggestionContainerProps extends RouteComponentProps {
  cocktails: Cocktail[];
  selection: string[];
}

const BuilderSuggestionContainer: React.FC<BuilderSuggestionContainerProps> = ({
  cocktails,
  selection,
}) => {
  const onBuilder = location.pathname === '/build-a-drink';

  const everything = cocktails.filter((cocktail) => cocktail.relevance === 3);
  const twoMatches = cocktails.filter((cocktail) => cocktail.relevance === 2);
  const oneMatch = cocktails.filter((cocktail) => cocktail.relevance === 1);

  const responsiveFontSize = ['2xl', '2xl', '3xl', '3xl'];

  return (
    <>
      {onBuilder ? (
        <Flex
          direction="column"
          align="flex-start"
          m={2}
          h="100%"
          overflowY="scroll"
        >
          {everything.length ? (
            <>
              <Box m={4}>
                <Heading
                  w="100%"
                  fontSize={responsiveFontSize}
                  color="gray.400"
                >
                  Found a perfect match:{' '}
                </Heading>
                <Text>
                  {everything.length > 1
                    ? `these ${everything.length} cocktails match`
                    : 'this cocktail matches'}{' '}
                  your perfect build:
                </Text>
              </Box>
              {everything.map((cocktail) => (
                <BuilderSuggestion
                  cocktail={cocktail}
                  selection={selection}
                  key={cocktail.id}
                />
              ))}
            </>
          ) : (
            <Box m={4}>
              <Heading w="100%" fontSize={responsiveFontSize} color="gray.400">
                No Measured cocktails that match your build perfectly.
              </Heading>
              <Text>
                Well, not yet.{'  '}
                <Link to="/add">
                  <strong>Want to add a custom cocktail? &rarr;</strong>
                </Link>
              </Text>
            </Box>
          )}
          {twoMatches.length ? (
            <>
              <Box m={4}>
                <Heading
                  w="100%"
                  fontSize={responsiveFontSize}
                  color="gray.400"
                >
                  Found a possible option:{' '}
                </Heading>
                <Text>
                  {twoMatches.length > 1
                    ? `these ${twoMatches.length} cocktails include`
                    : 'this cocktail includes'}{' '}
                  two of your desired flavours:
                </Text>
              </Box>
              {twoMatches.map((cocktail) => (
                <BuilderSuggestion
                  cocktail={cocktail}
                  selection={selection}
                  key={cocktail.id}
                />
              ))}
            </>
          ) : null}
          {oneMatch.length ? (
            <>
              <Box m={4}>
                <Heading
                  w="100%"
                  fontSize={responsiveFontSize}
                  color="gray.400"
                >
                  Not quite your build, but take a look:{' '}
                </Heading>
                <Text>
                  {oneMatch.length > 1
                    ? `these ${oneMatch.length} cocktails include`
                    : 'this cocktail includes'}{' '}
                  one of your desired flavours:
                </Text>
              </Box>
              {oneMatch.map((cocktail) => (
                <BuilderSuggestion
                  cocktail={cocktail}
                  selection={selection}
                  key={cocktail.id}
                />
              ))}
            </>
          ) : null}
        </Flex>
      ) : (
        <Flex direction="column" align="flex-start">
          {cocktails.map((cocktail) => (
            <BuilderSuggestion
              cocktail={cocktail}
              selection={selection}
              key={cocktail.id}
            />
          ))}
        </Flex>
      )}
    </>
  );
};

export default BuilderSuggestionContainer;
