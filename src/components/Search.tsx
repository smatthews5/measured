/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import {
  Flex,
  Input,
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
    <Flex justify="center" align="center" direction="column">
      <Flex width="75%" justify="center" align="center">
        <InputGroup width="100%">
          <Input borderRadius="8px" />
          <InputRightElement>
            <SearchIcon name="search" color="grey"/>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex direction={{base: 'column', md: 'row'}} width="75%" align="center">
        <FormLabel
          htmlFor="cocktail"
          width="25%"
          margin="2px"
          color="#C67833"
          fontFamily="heading"
          fontSize={{base: '15px', md: '20px'}}
        >
          Filter by:
        </FormLabel>
        <Flex width= "100%">
          <FormControl>
            <Select
              isTruncated
              id="base-ingedient"
              placeholder="Base Ingedient"
              color="#C67833"
              fontFamily="{theme.fonts.body}"
              border="none"
              fontSize={['10px', '16px', '16px', '16px']}
            >
              {/* for each option */}
              <option>Gin</option>
              <option>Vodka</option>
              <option>Rum</option>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              isTruncated
              id="strength"
              placeholder="Strength"
              color="#C67833"
              fontFamily={theme.fonts.body}
              border="none"
              fontSize={['10px', '16px', '16px', '16px']}
            >
              <option>Hard Af</option>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              isTruncated
              id="flavour"
              placeholder="Flavour"
              color="#C67833"
              fontFamily={theme.fonts.body}
              border="none"
              fontSize={['10px', '16px', '16px', '16px']}
            >
              <option>Fruity</option>
            </Select>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Search;
