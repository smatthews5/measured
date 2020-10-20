import {
  Heading,
  Flex,
  Image,
  HStack,
  Tag,
  TagLabel,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { useContext } from 'react';
import { Ingredient } from '../interfaces';
import { GiWineBottle } from 'react-icons/gi';
import { UserContext } from '../Context';
import {
  addIngredient,
  getUserDocument,
  removeIngredient,
} from '../services/firebase';
import { CheckIcon } from '@chakra-ui/icons';

interface CardDetailProps extends RouteComponentProps {
  ingredient: Ingredient;
}

// TODO: MAKE THIS PAGE RESPONSIVE

const CardDetail: React.FC<CardDetailProps> = ({ ingredient }) => {
  const { user, setUser } = useContext(UserContext);

  const toast = useToast();

  const handleClickMyBar = async (ingredient: string) => {
    if (!user.myIngredients.includes(ingredient)) {
      addIngredient(user.uid, ingredient);
    } else {
      removeIngredient(user.uid, ingredient);
    }
    const updatedUser = await getUserDocument(user.uid);
    setUser(updatedUser);
  };

  return (
    <Flex width="100%" justifyContent="space-between">
      <Image
        src={ingredient.imageUrl}
        w="9vw"
        h="9vw"
        objectFit="cover"
        borderRadius={2}
      />
      <Flex direction="column" ml={8} justifyContent="space-between" mr="auto">
        <Heading as="h4" fontSize="2.5em" fontFamily="mono" fontWeight="600">
          {ingredient.name}
        </Heading>
        <HStack spacing={4} pb="5%">
          {ingredient.categories.map((category) => (
            <Tag
              size="lg"
              key={category}
              variant="subtle"
              bgColor="purple.200"
              color="purple.400"
              fontWeight="600"
              fontFamily="mono"
              letterSpacing="0.02em"
              fontSize="1.25em"
            >
              <TagLabel>{category}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </Flex>
      <Stack direction="row" spacing={4} align="center">
        <Button
          colorScheme="gray"
          variant="solid"
          w="6vw"
          onClick={
            user
              ? () => handleClickMyBar(ingredient.name)
              : () =>
                  toast({
                    title: 'Please log in.',
                    description:
                      'You need to be logged in to add ingredients to your bar.',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                  })
          }
        >
          {user?.myIngredients.includes(ingredient.name) ? (
            <CheckIcon size={30} />
          ) : (
            <GiWineBottle size={30} />
          )}
        </Button>
      </Stack>
    </Flex>
  );
};

export default CardDetail;
