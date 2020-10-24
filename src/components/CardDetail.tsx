import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { UserContext } from '../Context';
import {
  addIngredient,
  getUserDocument,
  removeIngredient,
} from '../services/firebase';
import { Ingredient } from '../interfaces';

import {
  Heading,
  Flex,
  Image,
  Tag,
  TagLabel,
  Tooltip,
  Stack,
  useToast,
} from '@chakra-ui/core';

import tick from '../assets/images/tick.png';
import bar from '../assets/images/bar.png';
import loading from '../assets/images/loading.png';

interface CardDetailProps extends RouteComponentProps {
  ingredient: Ingredient;
}

// TODO: MAKE THIS PAGE RESPONSIVE

const CardDetail: React.FC<CardDetailProps> = ({ ingredient }) => {
  const { user, setUser } = useContext(UserContext);

  const toast = useToast();

  const imageSide = ['35vw', '22vw', '18vw', '18vw'];

  const handleClickMyBar = async (ingredient: string) => {
    if (user) {
      if (!user.myIngredients.includes(ingredient)) {
        addIngredient(user.uid, ingredient);
      } else {
        removeIngredient(user.uid, ingredient);
      }
      const updatedUser = await getUserDocument(user.uid);
      if (updatedUser && setUser) setUser(updatedUser);
    }
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
        <div>
          <Tag
            size="lg"
            variant="subtle"
            bgColor="purple.200"
            color="purple.400"
            fontWeight="600"
            fontFamily="mono"
            letterSpacing="0.02em"
            fontSize="1.25em"
          >
            <TagLabel width="auto">{ingredient.barCategory}</TagLabel>
          </Tag>
        </div>
      </Flex>
      <Flex w="5vw" h="5vw" my="auto" align="center" justify="center">
        <Tooltip
          label={
            user?.myIngredients.includes(ingredient.name)
              ? 'Remove from my bar'
              : 'Add to my bar'
          }
          fontSize="sm"
          bgColor="purple.400"
        >
          <Image
            fit="cover"
            borderRadius={['2px', '3px', '4px', '5px']}
            fallbackSrc={loading}
            src={user?.myIngredients.includes(ingredient.name) ? tick : bar}
            alt={ingredient.name}
            overflow="hidden"
            cursor="pointer"
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
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default CardDetail;
