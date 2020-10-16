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
    <Flex width="100%" justifyContent="space-between">
      <Image
        src={ingredient.imageUrl}
        w="9vw"
        h="9vw"
        objectFit="cover"
        borderRadius="5px"
      />
      <Flex direction="column" ml={8} justifyContent="space-between" mr="auto">
        <Text
          fontFamily="mono"
          fontSize="3em"
          fontWeight="600"
          letterSpacing="0.03em"
        >
          {ingredient.name}
        </Text>
        <HStack spacing={4} pb="5%" ml={2}>
          {ingredient.categories.map((category) => (
            <Tag
              size="lg"
              key={category}
              variant="subtle"
              bgColor="purple.200"
              color="purple.400"
              fontFamily="body"
              fontSize="lg"
            >
              <TagLabel>{category}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </Flex>
      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="gray" variant="solid" w="6vw">
          <GiWineBottle size={30} />
        </Button>
        <Button colorScheme="gray" variant="solid" w="6vw">
          <GiShoppingCart size={30} />
        </Button>
      </Stack>
    </Flex>
  );
};

export default CardDetail;
