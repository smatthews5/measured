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
import theme from '../theme';
const Search: React.FC = () => {
  return (
    <Flex
      margin="20px"
      justify="center"
      align="center"
      direction="column"
    >
      <Flex
        border={`1.5px solid ${theme.colors.grey}`}
        width="75%"
        borderRadius="6px"
      >
        <InputGroup width="100%">
          <Input />
          <InputRightElement>
            <Icon name="search" color={theme.colors.grey} />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel htmlFor="country">Filter ⌄</FormLabel>
          <Select id="country" placeholder="Select country" />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Search;
