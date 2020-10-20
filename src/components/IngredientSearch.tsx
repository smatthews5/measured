import React, { useContext, useState, useEffect } from 'react';
import { BoozeContext } from '../Context';
import { navigate, RouteComponentProps } from '@reach/router';

import {
  Flex,
  Text,
  Heading,
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

const IngredientSearch: React.FC = () => {
  const { booze } = useContext(BoozeContext);
  const [barCategory, setBarCategory] = useState<string>('');
  const [heading, setHeading] = useState<string>('All ingredients');

  return (
    <Flex justify="center" align="center" direction="column" pt="5vh">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="70%"
        align="center"
      >
        <Flex direction="column" width="100%" mt={2}>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="unstyled"
              bgColor="purple.400"
              color="white"
              width="33%"
              id="base-ingedient"
              fontSize={responsiveFontButton}
              size="lg"
              height={responsiveButtonHeight}
              marginRight="5px"
            >
              Select a category
            </MenuButton>
            <MenuList
              maxHeight="200px"
              overflowY="scroll"
              fontSize={responsiveFontButton}
            >
              {/* <MenuOptionGroup
                  type="checkbox"
                  defaultValue={barCategory}
                  onChange={(value) => {
                    setBarCategory(value);
                  }}
                >
                  {booze.bases.map((base: string, index: number) => (
                    <MenuItemOption key={index} value={base}>
                      {base}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup> */}
            </MenuList>
          </Menu>
          <Heading as="h4" fontFamily="mono" mt="3vh" fontSize="8vh">
            {heading}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IngredientSearch;
