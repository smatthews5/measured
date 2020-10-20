import React from 'react';
import { RouteComponentProps } from '@reach/router';

import {
  Flex,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/core';

import { ChevronDownIcon } from '@chakra-ui/icons';

const responsiveFontButton = ['8px', '12px', '14px', '16px'];
const responsiveButtonHeight = ['20px', '30px', '40px'];

interface IngredientSearchProps extends RouteComponentProps {
  barCategories: string[];
  category: string[] | string[];
  handleSelect: (category: string | string[]) => void;
  clearCategories: () => void;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({
  barCategories,
  category,
  handleSelect,
  clearCategories,
}) => {
  return (
    <Flex justify="center" align="center" direction="column" pt="5vh">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="70%"
        align="center"
      >
        <Flex direction="column" width="100%" mt={2}>
          <Flex>
            <Menu closeOnSelect={false}>
              <MenuButton
                isTruncated
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="unstyled"
                bgColor="purple.400"
                color="white"
                width="33%"
                id="base-ingedient"
                fontSize={responsiveFontButton}
                size="lg"
                height={responsiveButtonHeight}
                marginRight="5px"
              >
                Select ingredient categories
              </MenuButton>
              <MenuList
                maxHeight="200px"
                overflowY="scroll"
                fontSize={responsiveFontButton}
              >
                <MenuOptionGroup
                  type="checkbox"
                  defaultValue={category}
                  value={category}
                  onChange={(value) => handleSelect(value)}
                >
                  {barCategories.map((item: string) => (
                    <MenuItemOption
                      key={item}
                      value={item}
                      type="checkbox"
                      textTransform="capitalize"
                    >
                      {item}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Button
              onClick={clearCategories}
              variant="outline"
              color="purple.400"
              width="15%"
              ml="2%"
              fontSize={responsiveFontButton}
              height={responsiveButtonHeight}
              size="lg"
            >
              Show all
            </Button>
          </Flex>
          <Flex>
            <Flex marginTop="10px" width="100%" overflowX="scroll">
              <Flex>
                <Heading
                  as="h5"
                  color="gray.500"
                  fontSize={responsiveFontButton}
                  textTransform="uppercase"
                >
                  Show me...
                </Heading>
              </Flex>
              {category.length > 0 ?
                category.map((selection) => (
                <Heading
                  as="h5"
                  key={selection}
                  pl={3}
                  textTransform="uppercase"
                  color="gray.400"
                  fontSize={responsiveFontButton}
                >
                  {selection}
                </Heading>
              )) : (
                <Heading
                as="h5"
                pl={3}
                textTransform="uppercase"
                color="gray.400"
                fontSize={responsiveFontButton}
              >
                all
              </Heading>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IngredientSearch;
