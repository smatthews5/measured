import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';

import { BoozeContext } from '../Context';
import {
  Divider,
  Flex,
  Heading,
  Button,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
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

const AddACocktail: React.FC = () => {
  const { booze } = useContext(BoozeContext);

  const [name, setName] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [glassware, setGlassware] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<{ [key: number]: string }>(
    {},
  );
  const [garnish, setGarnish] = useState<Garnish>({
    name: '',
    description: '',
  });

  const [units, setUnits] = useState<string[]>([]);
  const [steps, setSteps] = useState(0);
  const [tempAmounts, setTempAmounts] = useState<{ [key: string]: number }>({});
  const [tempUnits, setTempUnits] = useState<{ [key: string]: string }>({});
  const [tempInstructions, setTempInstructions] = useState<string[]>([]);

  const [showGarnishSection, toggleGarnishSection] = useState(false);
  const [showIngredientSection, toggleIngredientSection] = useState(false);
  const [showInstructionSection, toggleInstructionSection] = useState(false);

  const getUnits = () => {
    const allUnits: string[] = [];
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

  const addMyCocktail = async () => {
    const allIngredients: IngredientDetails[] = [];
    ingredientsList.forEach((ingredient) => {
      const ingredientObj = {
        name: ingredient,
        amount: tempAmounts[ingredient],
        unit: tempUnits[ingredient],
      };
      allIngredients.push(ingredientObj);
    });
    const newCocktail: Cocktail = {
      name: name.toLowerCase(),
      ingredients: allIngredients,
      instructions: Object.values(instructions),
      base,
      imageUrl,
      glassware,
      categories,
      ingredientsList,
      garnish,
    };
    console.log('---> newCocktail:', newCocktail);
    try {
      await postCocktail(newCocktail);
      navigate('/');
    } catch (error) {
      console.log('---> error posting new cocktail to db', error);
    }
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
            {base.length || categories.length || glassware.length ? (
              <Flex marginTop="10px" width="100%" overflowX="scroll">
                {base ? (
                  <Heading
                    as="h5"
                    textTransform="uppercase"
                    color="gray.500"
                    fontSize={['8px', '12px', '14px', '16px']}
                  >
                    {base}
                  </Heading>
                ) : null}
                {categories
                  ? categories.map((selection) => (
                      <Heading
                        as="h5"
                        key={selection}
                        pl={3}
                        textTransform="uppercase"
                        color="gray.400"
                        fontSize={['8px', '12px', '14px', '16px']}
                      >
                        {selection}
                      </Heading>
                    ))
                  : null}
                {glassware ? (
                  <Heading
                    as="h5"
                    pl={3}
                    textTransform="uppercase"
                    color="gray.500"
                    fontSize={['8px', '12px', '14px', '16px']}
                  >
                    {glassware}
                  </Heading>
                ) : null}
              </Flex>
            ) : null}
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
                    onChange={(value: React.SetStateAction<string>) => setBase(value)}
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
                  All core ingredients
                </MenuButton>

                <MenuList overflowY="scroll" maxHeight="30vh">
                  <MenuOptionGroup
                    title="Select all"
                    type="checkbox"
                    onChange={(value) => {
                      toggleIngredientSection(true);
                      setIngredientsList(value);
                      setUnits(getUnits());
                    }}
                  >
                    {booze?.ingredients
                      .sort((a, b) =>
                        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
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
              <FormHelperText>
                Include every ingredient required for making the cocktail,
                including the base but excluding the garnish.
              </FormHelperText>
              {showIngredientSection && ingredientsList.length
                ? ingredientsList.map((ingredient: string) => (
                    <Flex
                      key={ingredient}
                      width="100%"
                      align="center"
                      justify="space-evenly"
                      mt={4}
                    >
                      <FormLabel mt={5} width="30%" textAlign="center">
                        How much {ingredient}?
                      </FormLabel>
                      <FormControl isRequired width="30%">
                        <NumberInput
                          step={0.25}
                          min={0}
                          max={1000}
                          height="100%"
                          onChange={(value) => {
                            setTempAmounts((prevObj) => ({
                              ...prevObj,
                              [ingredient]: value,
                            }));
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
                        width="30%"
                        onChange={(event) => {
                          setTempUnits((prevObj) => ({
                            ...prevObj,
                            [ingredient]: event.target.value,
                          }));
                        }}
                      >
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
                  <FormLabel mt={5}>
                    How should you prepare the garnish?
                  </FormLabel>
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
          <FormControl id="cocktail-instructions" isRequired>
            <FormLabel mt={5} as="h3" fontFamily="heading">
              Cocktail instructions
            </FormLabel>
            <Flex width="100%" justify="space-between" align="center">
              <FormLabel mt={5} textAlign="center" width="40%">
                How many steps to make{' '}
                {name.length ? `a ${name}` : 'the cocktail'}?
              </FormLabel>
              <NumberInput
                step={1}
                min={0}
                max={10}
                width="20%"
                onChange={(value) => setSteps(parseInt(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                w="25%"
                onClick={() => {
                  setTempInstructions(Array(steps).fill(''));
                  toggleInstructionSection(true);
                }}
                rightIcon={<ChevronDownIcon />}
                variant="unstyled"
                bgColor="purple.400"
                color="gray.100"
                size="md"
              >
                Add instructions
              </Button>
            </Flex>
            {showInstructionSection
              ? tempInstructions.map((_, index) => (
                  <Input
                    my={2}
                    id={`cocktail-instruction-${index}`}
                    key={index}
                    placeholder={`Step ${index + 1}`}
                    onChange={(event) =>
                      setInstructions((prevObj) => ({
                        ...prevObj,
                        [index]: event.target.value.toLowerCase(),
                      }))
                    }
                  />
                ))
              : null}
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
