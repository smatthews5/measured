import React, { useContext } from 'react';
import { BoozeContext } from '../Context';
import {
  Flex,
  Input,
  InputRightElement,
  InputGroup,
  FormControl,
  Select,
} from '@chakra-ui/core';
import { SearchIcon } from '@chakra-ui/icons';

// TODO: Load dropdown options dynamically, from database
const responsiveFont = ['10px', '16px', '16px', '16px'];

const Search: React.FC = () => {
  const { booze } = useContext(BoozeContext);

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
        <Flex width="100%">
          <FormControl>
            <Select
              id="base-ingedient"
              placeholder="Booze of choice"
              border="none"
              fontSize={responsiveFont}
            >
              <option>Gin</option>
              <option>Vodka</option>
              <option>Rum</option>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              id="category"
              placeholder="Category"
              border="none"
              fontSize={responsiveFont}
            >
              {booze.categories.map((category: string) => (
                <option key={category}>{category}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              id="flavour"
              placeholder="Flavour"
              border="none"
              fontSize={responsiveFont}
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
