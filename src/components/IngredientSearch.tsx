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
  category: string[];
  handleSelect: (category: string[]) => void;
  clearCategories: () => void;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({
  barCategories,
  category,
  handleSelect,
  clearCategories,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      pt="5vh"
      width="100%"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="70%"
        align="center"
      >
        <Flex direction="column" width="100%" mt={2}>
          <Flex>
            {category.length > 0 ? (
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
                {category.map((selection) => (
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
                ))}
              </Flex>
            ) : null}
          </Flex>
          <Flex>
            <Menu closeOnSelect={false}>
              <MenuButton
                isTruncated
                width="80%"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="unstyled"
                bgColor="purple.400"
                color="white"
                id="base-ingedient"
                fontSize={responsiveFontButton}
                size="lg"
                px={2}
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
                  onChange={(value) => {
                    if (typeof value === 'string') value = [value];
                    handleSelect(value);
                  }}
                >
                  {barCategories.map((item: string) => (
                    <MenuItemOption key={item} value={item} type="checkbox">
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
              width="20%"
              px={2}
              fontSize={responsiveFontButton}
              height={responsiveButtonHeight}
              size="lg"
            >
              Show all
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IngredientSearch;
