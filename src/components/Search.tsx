/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { BoozeContext } from '../Context';
import { css, jsx } from '@emotion/core';
import { Cocktail } from '../interfaces';

import {
  Flex,
  Input,
  InputRightElement,
  InputGroup,
  FormControl,
  Select,
  Button,
  FormLabel,
  ButtonGroup,
} from '@chakra-ui/core';
import { SearchIcon } from '@chakra-ui/icons';
import { Search } from '../interfaces';
import {
  getMatchingCocktailsByBase,
  getMatchingCocktailsByCategory,
} from '../services/firebase';

// TODO: Load dropdown options dynamically, from database
const responsiveFont = ['10px', '16px', '16px', '16px'];

const Search: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  const [base, setBase] = useState('');
  const [category, setCategory] = useState('');
  const [flavour, setFlavour] = useState('');

  const [bases, setBases] = useState<Cocktail[]>();
  const [categories, setCategories] = useState<Cocktail[]>();

  if (bases && categories) {
    const ids = new Set(bases.map((d) => d.id));
    const merged = [...bases, ...categories.filter((d) => !ids.has(d.id))];
  }
  // merged is an array of unique cocktails
console.log(merged);


  function setSearchCriteria(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.preventDefault();
    getMatchingCocktailsByBase(base).then((cocktail: Cocktail) => setBases(cocktail));
    getMatchingCocktailsByCategory(category).then((cocktail: Cocktail) => setCategories(cocktail));
  };

  return (
    <Flex justify="center" align="center" direction="column" py="5vh">
      <Flex width="70%" justify="center" align="center">
        <form
          css={css`
            width: 100%;
          `}
        >
          <InputGroup width="100%" size="sm">
            <Input borderRadius="8px" />
            <InputRightElement>
              <SearchIcon name="search" color="grey" />
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="70%"
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
              id="base-ingedient"
              placeholder="Booze of choice"
              border="none"
              // focusBorderColor="#e5e5e5"
              focusBorderColor="none"
              /* not sure on the grey here? Maybe just none*/
              fontSize={responsiveFont}
              onChange={(e) => {
                setBase(e.target.value);
              }}
            >
              {booze.bases.map((base: string) => (
                <option>{base}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              id="category"
              placeholder="Category"
              border="none"
              fontSize={responsiveFont}
              // focusBorderColor="#e5e5e5"
              focusBorderColor="none"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
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
              // focusBorderColor="#e5e5e5"
              focusBorderColor="none"
              onChange={(e) => {
                setFlavour(e.target.value);
              }}
            >
              <option>Fruity</option>
            </Select>
          </FormControl>
          <ButtonGroup spacing={4} onClick={setSearchCriteria}>
            <Button leftIcon={<SearchIcon />} variant="solid">
              Search
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Search;
