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

const Search: React.FC = () => {
  return (
    <Flex justify="center" align="center" direction="column">
      <Flex width="75%" justify="center" align="center">
        <InputGroup width="100%" size='sm'>
          <Input borderRadius="8px" />
          <InputRightElement>
            <SearchIcon name="search" color="grey" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="75%"
        align="center"
      >
        <Flex align='center' width='35%' justifyContent={['center', 'center','flex-start']}>
          <FormLabel
            htmlFor="cocktail"
            width={['auto', 'auto']}
            marginTop={['10px', '10px']}
            marginLeft="10px"
            color="#C67833"
            fontFamily="heading"
            fontSize={{ base: '15px', md: '20px' }}
          >
            Filter by:
          </FormLabel>
        </Flex>
        <Flex width="100%">
          <FormControl>
            <Select
              isTruncated
              id="base-ingedient"
              placeholder="Base Ingedient"
              color="#C67833"
              fontFamily="body"
              border="none"
              fontSize={['10px', '16px', '16px', '16px']}
              focusBorderColor="#e5e5e5" 
              /* not sure on the grey here? Maybe just none*/
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
              fontFamily="body"
              border="none"
              fontSize={['10px', '16px', '16px', '16px']}
              focusBorderColor="#e5e5e5"
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
              fontFamily="body"
              border="none"
              fontSize={['10px', '16px', '16px', '16px']}
              focusBorderColor="#e5e5e5"
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
