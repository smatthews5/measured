/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { BoozeContext } from '../Context';
import { css, jsx } from '@emotion/core';
import { navigate } from '@reach/router';

import {
  Flex,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/core';

import {
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

const responsiveFontButton = ['8px', '12px', '14px', '16px'];
const responsiveButtonHeight = ['20px', '30px', '40px'];

const Search: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const [base, setBase] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  function setSearchCriteria(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    const basesURI = base.map((name) => encodeURI(name));
    const basesString = basesURI.join('+');
    const categoriesURI = category.map((name) => encodeURI(name));
    const categoriesString = categoriesURI.join('+');
    navigate(`/search/${basesString}_${categoriesString}`);
  }

  return (
    <Flex justify="center" align="center" direction="column" py="5vh">
      <Flex width="70%" justify="center" align="center">
        <InputGroup width="100%" size="sm">
          <Input borderRadius="8px" />
          <InputRightElement>
            <SearchIcon name="search" color="grey" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="70%"
        align="center"
      >
        <Flex width="100%" justify="space-between" mt={2}>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              width="33%"
              color="purple.400"
              id="base-ingedient"
              fontSize={responsiveFontButton}
              size="lg"
              height={responsiveButtonHeight}
              marginRight="5px"
            >
              Booze of choice
            </MenuButton>
            <MenuList
              maxHeight="200px"
              overflowY="scroll"
              fontSize={responsiveFontButton}
            >
              <MenuOptionGroup
                type="checkbox"
                onChange={(value) => {
                  setBase(value);
                }}
              >
                {booze.bases.map((base: string, index: number) => (
                  <MenuItemOption key={index} value={base}>
                    {base}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              width="33%"
              color="purple.400"
              id="base-ingedient"
              fontSize={responsiveFontButton}
              size="lg"
              height={responsiveButtonHeight}
              marginRight="5px"
            >
              Type of drink
            </MenuButton>
            <MenuList
              maxHeight="200px"
              overflowY="scroll"
              fontSize={responsiveFontButton}
            >
              <MenuOptionGroup
                type="checkbox"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {booze?.categories.map((category: string, index: number) => (
                  <MenuItemOption key={index} value={category}>
                    {category}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Button
            onClick={setSearchCriteria}
            rightIcon={<ChevronRightIcon />}
            variant="unstyled"
            color="purple.400"
            width="33%"
            fontSize={responsiveFontButton}
            size="lg"
            height={responsiveButtonHeight}
          >
            Find my cocktail
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Search;
