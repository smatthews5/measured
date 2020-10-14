import {
  Box,
  Flex,
  Text,
  Image,
  HStack,
  Tag,
  TagLabel,
  Button,
  Stack,
} from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Ingredient } from '../interfaces';
import { GiShoppingCart, GiWineBottle } from 'react-icons/gi';

interface CardDetailProps extends RouteComponentProps {
  ingredient: Ingredient;
}

const CardDetail: React.FC<CardDetailProps> = ({ ingredient }) => {
  return (
    <Flex width="100%">
      <Image
        src={ingredient.imageUrl}
        w="10vw"
        h="10vw"
        objectFit="cover"
        borderRadius="5px"
      />
      <Flex direction="column" ml="5%" justifyContent="space-between">
        <Text fontFamily="heading" fontSize="2em">
          {ingredient.name}
        </Text>
        <HStack spacing={4} pb="5%">
          {ingredient.categories.map((category) => (
            <Tag size="lg" key={category} variant="subtle" colorScheme="cyan">
              <TagLabel>{category}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </Flex>
      <Stack direction="row" spacing={4} align="center">
        {/* <Button
          colorScheme="gray"
          variant="solid"
          leftIcon={<GiWineBottle />}
        ></Button>
        <Button
          colorScheme="gray"
          variant="solid"
          leftIcon={<GiShoppingCart />}
        ></Button> */}
      </Stack>
    </Flex>
  );
};

export default CardDetail;
