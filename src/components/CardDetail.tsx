import {
  Heading
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

// TODO: MAKE THIS PAGE RESPONSIVE

const CardDetail: React.FC<CardDetailProps> = ({ ingredient }) => {
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
        <Heading
          as="h4"
          fontSize="2.5em"
          fontFamily="mono"
          fontWeight="600"
        >
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
