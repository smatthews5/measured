import React, { useState, useContext } from 'react';
import { BoozeContext } from '../Context';
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Divider,
} from '@chakra-ui/core';

import Header from '../components/Header';
import {
  Cocktail,
  Ingredient,
  IngredientDetails,
  Garnish,
} from '../interfaces';
import { postCocktail } from '../services/firebase';

const AddACocktail: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  const [cocktail, setCocktail] = useState<Partial<Cocktail>>({});
  const [ingredients, setIngredients] = useState<Partial<Ingredient[]>>([]);
  const [instructions, setInstructions] = useState<
    Partial<IngredientDetails[]>
  >([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [garnish, setGarnish] = useState<Partial<Garnish>>({});

  const onSubmit = () => {
    const ingredientsList: string[] = [];
    const newCocktail = {
      ...cocktail,
      categories,
      ingredients,
      ingredientsList,
      garnish,
      instructions,
    };
    console.log('---> newCocktail:', newCocktail);
    // postCocktail(newCocktail);
  };

  return (
    <>
      <Header />
      <Divider />
      <Flex w="80vw" align="center" justify="center" p={10}>
        <FormControl w="100%">
          <FormLabel>Cocktail name:</FormLabel>
          <Input
            name="name"
            id="cocktail-name"
            value={cocktail.name}
            placeholder="Martini"
          />
          <FormLabel mt={5}>Link to the cocktail image:</FormLabel>
          <Input
            name="imageUrl"
            id="cocktail-imageUrl"
            value={cocktail.imageUrl}
            placeholder="www.my-bar-photos..."
          />
          <FormLabel mt={5}>Cocktail details:</FormLabel>
          <Flex width="100%" justify="space-between" align="center" py={5}>
            <Menu closeOnSelect={true}>
              <MenuButton as={Button}>Main ingredient</MenuButton>
              <MenuList overflowY="scroll" maxHeight="30vh">
                <MenuOptionGroup title="Select one" type="radio">
                  {booze?.bases.map((base) => (
                    <MenuItemOption value={base} key={base}>
                      {base}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={false}>
              <MenuButton as={Button}>Flavour / strength</MenuButton>
              <MenuList overflowY="scroll" maxHeight="30vh">
                <MenuOptionGroup title="Select all" type="checkbox">
                  {booze?.categories.map((category) => (
                    <MenuItemOption value={category} key={category}>
                      {category}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={true}>
              <MenuButton as={Button}>Suggested glassware</MenuButton>
              <MenuList overflowY="scroll" maxHeight="30vh">
                <MenuOptionGroup title="Select one" type="radio">
                  {booze?.glasses.map((glass) => (
                    <MenuItemOption value={glass} key={glass}>
                      {glass}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>
          <FormLabel mt={5}>Cocktail ingredients:</FormLabel>
          <Flex width="100%" justify="space-around" align="center" py={5}>
            <Menu closeOnSelect={false}>
              <MenuButton as={Button}>Core ingredients</MenuButton>
              <MenuList overflowY="scroll" maxHeight="30vh">
                <MenuOptionGroup title="Select all" type="checkbox">
                  {booze?.ingredients.map((ingredient) => (
                    <MenuItemOption value={ingredient.id} key={ingredient.name}>
                      {ingredient.name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={true}>
              <MenuButton as={Button}>Suggested garnish</MenuButton>
              <MenuList overflowY="scroll" maxHeight="30vh">
                <MenuOptionGroup title="Select one" type="radio">
                  {booze?.ingredients.map((ingredient) => (
                    <MenuItemOption value={ingredient.id} key={ingredient.name}>
                      {ingredient.name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>
          {/* followed by dynamic forms for ingredient details, garnish details, instructions */}
        </FormControl>
      </Flex>
    </>
  );
};

export default AddACocktail;
