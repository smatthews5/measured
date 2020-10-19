import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';

import { BoozeContext } from '../Context';
import {
  Divider,
  Box,
  Flex,
  Heading,
  Button,
  Input,
  FormLabel,
  FormControl,
  Select,
  Menu,
  MenuList,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';

import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

import Header from '../components/Header';
import { Cocktail, IngredientDetails, Garnish } from '../interfaces';
import { postCocktail } from '../services/firebase';

// TODO:
// add instructions array
// fix setting of ingredients array
// fix setting of unit
// make select colour black
// auto add base to ingredients array and prepopulate select
// display selected terms under menu button

const AddACocktail: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  const [name, setName] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [glassware, setGlassware] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [garnish, setGarnish] = useState<Garnish>({
    name: '',
    description: '',
  });
  const [instructions, setInstructions] = useState<string[]>([]);

  const [units, setUnits] = useState<string[]>([]);
  const [tempAmounts, setTempAmounts] = useState<{ [key: string]: number }>({});
  const [tempUnits, setTempUnits] = useState<{ [key: string]: string }>({});

  const [showGarnishSection, toggleGarnishSection] = useState(false);
  const [showIngredientSection, toggleIngredientSection] = useState(false);

  const getUnits = () => {
    let allUnits: string[] = [];
    booze?.cocktails.forEach((cocktail) => {
      cocktail.ingredients.forEach((ingredient) => {
        allUnits.push(ingredient.unit);
      });
    });
    const uniqueUnits = new Set(allUnits);
    const sortedUnits = Array.from(uniqueUnits).sort((a, b) =>
      a > b ? 1 : -1,
    );
    return sortedUnits;
  };

  const addMyCocktail = () => {
    let allIngredients: IngredientDetails[] = [];
    ingredientsList.forEach((ingredient) => {
      const ingredientObj = {
        name: ingredient,
        amount: tempAmounts[ingredient],
        unit: tempUnits[ingredient],
      };
      allIngredients.push(ingredientObj);
      console.log('---> allIngredients', allIngredients);
    });
    const newCocktail: Cocktail = {
      name: name.toLowerCase(),
      ingredients: allIngredients,
      base,
      imageUrl,
      glassware,
      categories,
      ingredientsList,
      garnish,
      instructions,
    };
    console.log('---> newCocktail:', newCocktail);
    // try catch postCocktail(newCocktail);
    // REDIRECT (TRIGGER RE-FETCH??)
    // navigate('/');
  };

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Flex
          w="80vw"
          align="center"
          justify="center"
          p={10}
          direction="column"
          m="auto"
        >
          <Heading
            as="h3"
            mb={6}
            fontFamily="mono"
            fontWeight="600"
            fontSize={['2xl', '3xl', '4vw', '6vw']}
          >
            Add a new cocktail
          </Heading>
          <FormControl id="cocktail-name" isRequired>
            <FormLabel as="h3" fontFamily="heading">
              Cocktail name
            </FormLabel>
            <Input
              id="cocktail-name"
              placeholder="Martini"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl id="cocktail-imageUrl" isRequired>
            <FormLabel mt={5} as="h3" fontFamily="heading">
              Link to the cocktail image
            </FormLabel>
            <Input
              placeholder="www.my-bar-photos..."
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </FormControl>
          <FormControl id="cocktail-details" isRequired>
            <FormLabel mt={5} as="h3" fontFamily="heading">
              Cocktail details
            </FormLabel>
            <Flex width="100%" justify="space-between" align="center" py={1}>
              <Menu closeOnSelect={true}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  width="33%"
                  variant="unstyled"
                  bgColor="purple.400"
                  color="white"
                  size="lg"
                >
                  Base liquor
                </MenuButton>
                <MenuList overflowY="scroll" maxHeight="30vh">
                  <MenuOptionGroup
                    title="Select one"
                    type="radio"
                    onChange={(value) => setBase(value)}
                  >
                    {booze?.bases.map((base) => (
                      <MenuItemOption value={base} key={base}>
                        {base}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  width="33%"
                  variant="unstyled"
                  bgColor="purple.400"
                  color="white"
                  size="lg"
                >
                  Categories
                </MenuButton>
                <MenuList overflowY="scroll" maxHeight="30vh">
                  <MenuOptionGroup
                    title="Select all"
                    type="checkbox"
                    onChange={(value) => setCategories(value)}
                  >
                    {booze?.categories.map((category) => (
                      <MenuItemOption value={category} key={category}>
                        {category}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <Menu closeOnSelect={true}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  width="33%"
                  variant="unstyled"
                  bgColor="purple.400"
                  color="white"
                  size="lg"
                >
                  Suggested glassware
                </MenuButton>
                <MenuList overflowY="scroll" maxHeight="30vh">
                  <MenuOptionGroup
                    title="Select one"
                    type="radio"
                    onChange={(value) => setGlassware(value)}
                  >
                    {booze?.glasses.map((glass) => (
                      <MenuItemOption value={glass} key={glass}>
                        {glass}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
          </FormControl>
          <FormControl id="cocktail-ingredients" isRequired>
            <FormLabel mt={5} as="h3" fontFamily="heading">
              Cocktail ingredients
            </FormLabel>
            <Flex
              width="100%"
              justify="center"
              align="flex-start"
              py={1}
              direction="column"
            >
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  width="33%"
                  variant="unstyled"
                  bgColor="purple.400"
                  color="white"
                  size="lg"
                >
                  Core ingredients
                </MenuButton>
                <MenuList overflowY="scroll" maxHeight="30vh">
                  <MenuOptionGroup
                    title="Select all"
                    type="checkbox"
                    onChange={(value) => {
                      setIngredientsList(value);
                      setUnits(getUnits());
                      toggleIngredientSection(true);
                    }}
                  >
                    {booze?.ingredients.map((ingredient) => (
                      <MenuItemOption
                        value={ingredient.name}
                        key={ingredient.name}
                      >
                        {ingredient.name}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              {showIngredientSection && ingredientsList.length
                ? ingredientsList.map((ingredient: string) => (
                    <Flex
                      key={ingredient}
                      width="100%"
                      align="center"
                      justify="space-evenly"
                    >
                      <FormLabel mt={5} width="33%">
                        How much {ingredient}?
                      </FormLabel>
                      <FormControl isRequired>
                        <NumberInput
                          step={0.25}
                          min={0}
                          max={1000}
                          width="18%"
                          height="100%"
                          onChange={(value) => {
                            setTempAmounts((prevObj) => ({
                              ...prevObj,
                              [ingredient]: value,
                            }));
                            console.log('---> tempAmounts', tempAmounts);
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                      <Select
                        width="33%"
                        onChange={(event) => {
                          setTempUnits((prevObj) => ({
                            ...prevObj,
                            [ingredient]: event.target.value,
                          }));
                          console.log('---> tempUnits', tempUnits);
                        }}
                      >
                        <option value="0" key="default">
                          Unit of measurement
                        </option>
                        {units.map((unit) => (
                          <option value={unit} key={unit}>
                            {unit}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  ))
                : null}
            </Flex>
          </FormControl>
          <FormControl id="cocktail-garnish">
            <FormLabel mt={5} as="h3" fontFamily="heading">
              Cocktail garnish
            </FormLabel>
            <Flex
              width="100%"
              justify="center"
              align="flex-start"
              py={1}
              direction="column"
            >
              <Menu closeOnSelect={true}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  width="33%"
                  variant="unstyled"
                  bgColor="purple.400"
                  color="white"
                  size="lg"
                >
                  Suggested garnish
                </MenuButton>
                <MenuList overflowY="scroll" maxHeight="30vh">
                  <MenuOptionGroup
                    title="Select one"
                    type="radio"
                    onChange={(value) => {
                      setGarnish((prevGarnish) => ({
                        ...prevGarnish,
                        name: value,
                      }));
                      toggleGarnishSection(true);
                    }}
                  >
                    {booze?.ingredients
                      .filter((ingredient) =>
                        ingredient.builder.includes('garnish'),
                      )
                      .map((ingredient) => (
                        <MenuItemOption
                          value={ingredient.name}
                          key={ingredient.name}
                        >
                          {ingredient.name}
                        </MenuItemOption>
                      ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              {showGarnishSection ? (
                <>
                  <FormLabel mt={5}>Garnish description:</FormLabel>
                  <Input
                    id="cocktail-garnish"
                    placeholder="lemon twist / spiral"
                    value={garnish.description}
                    onChange={(event) =>
                      setGarnish((prevGarnish) => ({
                        ...prevGarnish,
                        description: event.target.value.toLowerCase(),
                      }))
                    }
                  />
                </>
              ) : null}
            </Flex>
          </FormControl>
          <Button
            w="100%"
            mt={8}
            onClick={addMyCocktail}
            rightIcon={<ChevronRightIcon />}
            variant="outline"
            bgColor="grey.100"
            color="purple.400"
            size="lg"
          >
            Add my cocktail
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default AddACocktail;
