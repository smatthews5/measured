/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import {
  Flex,
  Input,
  Icon,
  InputRightElement,
  InputGroup,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/core';
import { SearchIcon } from '@chakra-ui/icons';
import theme from '../theme';

const Search: React.FC = () => {
  return (
    <Flex margin="20px" justify="center" align="center" direction="column">
      <Flex width="75%" borderRadius="6px">
        <InputGroup>
          <Input />
          <InputRightElement>
            <SearchIcon name="search" color="grey" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex direction="row" width="75%" margin="10px" align="center">
        <FormLabel
          htmlFor="cocktail"
          width="25%"
          margin="10px"
          color="#C67833"
          fontFamily={theme.fonts.heading}
          fontSize="20px"
        >
          Filter by:{' '}
        </FormLabel>
        <FormControl margin="10px">
          <Select
            id="base-ingedient"
            placeholder="Base Ingedient"
            color="#C67833"
            fontFamily={theme.fonts.body}
            border="none"
          >
            {/* for each option */}
            <option>Gin</option>
            <option>Vodka</option>
            <option>Rum</option>
          </Select>
        </FormControl>
        <FormControl margin="10px">
          <Select
            id="strength"
            placeholder="Strength"
            color="#C67833"
            fontFamily={theme.fonts.body}
            border="none"
          >
            <option>Hard Af</option>
          </Select>
        </FormControl>
        <FormControl margin="10px">
          <Select
            id="flavour"
            placeholder="Flavour"
            color="#C67833"
            fontFamily={theme.fonts.body}
            border="none"
          >
            <option>Fruity</option>
          </Select>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Search;
