/** @jsx jsx */
import React, { useState, useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { BoozeContext } from '../Context';
import { Cocktail } from '../interfaces';

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
  const { booze } = useContext(BoozeContext);

  const [input, setInput] = useState('');
  const [submit, setSubmit] = useState('');
  const [newList, setNewList] = useState<Cocktail[]>();
  console.log(newList);

  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmit(input);
    const newCocktails = booze?.cocktails.filter((cocktail) =>
      cocktail.name.includes(submit),
    );
    setNewList(newCocktails);
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Flex width="75%" justify="center" align="center">
        <form
          onSubmit={onSubmit}
          css={css`
            width: 100%;
          `}
        >
          <InputGroup width="100%" size="sm">
            <Input onChange={onInput} borderRadius="8px" />
            <InputRightElement>
              <SearchIcon name="search" color="grey" />
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="75%"
        align="center"
      >
        <Flex
          align="center"
          width="35%"
          justifyContent={['center', 'center', 'flex-start']}
        >
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
