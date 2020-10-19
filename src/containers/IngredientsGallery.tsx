import React, { useContext } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import { Cocktail, Ingredient } from '../interfaces';

import {
  Box,
  Heading,
  Flex,
  Grid,
  Image,
  Text,
  IconButton,
} from '@chakra-ui/core';
import { CloseIcon } from '@chakra-ui/icons';
import {
  addIngredient,
  getUserDocument,
  removeIngredient,
} from '../services/firebase';
import { UserContext } from '../Context';

interface IngredientsGalleryProps extends RouteComponentProps {
  ingredients: Ingredient[];
}

const IngredientsGallery: React.FC<IngredientsGalleryProps> = ({
  ingredients,
}) => {
  const { user, setUser } = useContext(UserContext);

  const handleClick = async (ingredient: string) => {
    if (!user.myIngredients.includes(ingredient)) {
      addIngredient(user.uid, ingredient);
    } else {
      removeIngredient(user.uid, ingredient);
    }
    const updatedUser = await getUserDocument(user.uid);
    setUser(updatedUser);
  };
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6} pr="2%" pt="1%">
      {ingredients.map((ingredient) => (
        <Flex
          w="100%"
          h="20vh"
          bg="gray.100"
          direction="column"
          borderRadius="5px"
          key={ingredient.id}
          position="relative"
        >
          <Image
            src={ingredient.imageUrl}
            h="80%"
            objectFit="cover"
            borderTopRadius="5px"
          />
          <IconButton
            icon={<CloseIcon />}
            alignSelf="flex-end"
            color="purple.400"
            mr="6%"
            mt="6%"
            p="1%"
            size="xs"
            zIndex={2}
            position="absolute"
            variant="ghost"
            borderRadius="5px"
            _hover={{ bgColor: 'rgb(255,255,255,0.6)' }}
            onClick={() => handleClick(ingredient.name)}
          />
          <Text
            h="20%"
            alignSelf="center"
            textAlign="center"
            fontFamily="body"
            fontSize="md"
            color="purple.400"
          >
            {ingredient.name}
          </Text>
        </Flex>
      ))}
      <Box
        w="100%"
        h="20vh"
        bg="gray.100"
        borderRadius="5px"
        textAlign="center"
        verticalAlign="middle"
        lineHeight="20vh"
        fontSize="15vh"
        color="purple.400"
        fontFamily="heading"
        onClick={() => navigate('/ingredients')}
      >
        +
      </Box>
    </Grid>
  );
};

export default IngredientsGallery;
