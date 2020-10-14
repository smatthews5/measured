/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { BoozeContext } from '../Context';
import { css, jsx } from '@emotion/core';
import { Booze, Cocktail } from '../interfaces';
import { RouteComponentProps, navigate } from '@reach/router';

import {
  Flex,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  FormLabel,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/core';
import { SearchIcon } from '@chakra-ui/icons';
import {
  getMatchingCocktailsByBase,
  getMatchingCocktailsByCategory,
} from '../services/firebase';

// TODO: Load dropdown options dynamically, from database
const responsiveFont = ['10px', '16px', '16px', '16px'];

const Search: React.FC = () => {
  const { booze, setBooze } = useContext(BoozeContext);

  const [base, setBase] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  const [filteredBases, setfilteredBases] = useState<Cocktail[]>([]);
  const [filteredCategories, setfilteredCategories] = useState<Cocktail[]>([]); 

  //concatenate base and category arrays and encode for url..
  const arrConcat = base.concat(category);
const searchQuery = arrConcat.join('+');

  //on press of search button run this function. Fetch from the database, the mathcing cocktails. Then filter into an array of unique cocktails
  function setSearchCriteria(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    if (base.length > 0) {
      getMatchingCocktailsByBase(base).then((cocktail: Cocktail[]) => setfilteredBases(cocktail));
    }
    if (category.length > 0) {
      getMatchingCocktailsByCategory(category).then((cocktail: Cocktail[]) => setfilteredCategories(cocktail));
    }
    // unique cocktails function
    // if (filteredBases && filteredCategories) {
      const ids = new Set(filteredBases.map((d) => d.id));
      const spreadCategories = filteredCategories.filter(
          (d) => !ids.has(d.id),
        ),
        results = [...filteredBases, ...spreadCategories];
      const search = {
        query: [...base, ...category],
        results,
      };
      // add search property to booze object
      setBooze((prevBooze: Booze) => ({ ...prevBooze, search: search }));      
      // navigate to search page if not already there
      location.pathname === '/' ?
      navigate(`/search/${searchQuery}`) : null;
    // }
  }

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
        <Flex width="100%" justify="space-between" margin="10px">
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              id="base-ingedient"
              fontSize={responsiveFont}
            >
              Booze of choice
            </MenuButton>
              
              <MenuList maxHeight="200px" overflowY='scroll'>
              <MenuOptionGroup
                type="checkbox"
                onChange={(value) => {
                  setBase(value);
                }}
              >
                {booze.bases.map((base: string, index: number) => (
                  <MenuItemOption key={index} value={base}>{base}</MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              id="base-ingedient"
              fontSize={responsiveFont}
            >
              Category
            </MenuButton>
            <MenuList maxHeight="200px" overflowY='scroll'>
              <MenuOptionGroup
                type="checkbox"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {booze?.categories.map((category: string, index: number) => (
                  <MenuItemOption key={index} value={category}>{category}</MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
            <Button
            onClick={setSearchCriteria}
              leftIcon={<SearchIcon />}
              variant="outline"
              colorScheme="purple"
            >
              Search
            </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Search;
