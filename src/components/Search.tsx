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

              fontSize={['10px', '16px', '16px', '16px']}
              focusBorderColor="#e5e5e5"
              /* not sure on the grey here? Maybe just none*/

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
