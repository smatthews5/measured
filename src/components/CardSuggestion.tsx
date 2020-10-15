import React, { useContext } from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { Cocktail, Ingredient, Relevance } from '../interfaces';
import { UserContext } from '../Context';

const CardSuggestion: React.FC = ({ cocktails }) => {
  const { user } = useContext(UserContext);
  const userIngredients = user?.myIngredients;

  const userIngredientsNames = userIngredients?.map(
    (ingredient) => ingredient.name,
  );
  /* 
filteredCocks now contains all the cocktails that contain the ingredients that we have.. but it is not yet a unique array..
we need to filter by how many of our ingredients match those in the cocktail - so tht they are ordered by what we have the most of..
*/

  const cocks: Cocktail[] = [];
  for (let i = 0; i < cocktails.length; i++) {
    for (let j = 0; j < cocktails[i].ingredients.length; j++) {
      for (let c = 0; c < userIngredients.length; c++) {
        if (userIngredientsNames[c] === cocktails[i].ingredients[j].name) {
          cocks.push(cocktails[i]);
        }
      }
    }
  }
  cocks.forEach((cock) => console.log('cocks', cock.id));
  console.log('cocks', cocks);
  console.log('cocks.length', cocks.length);

  return (
    <Flex direction="column">
      {cocks.map((cocktail, index: number) => (
        <Flex key={index} margin="10px">
          <Image src={cocktail.imageUrl} width="13vw" borderRadius="5px" />
          <Flex direction="column" marginLeft="10px">
            <Text>
              {cocktail.name.charAt(0).toUpperCase() + cocktail.name.slice(1)}
            </Text>
            <Flex marginTop="10px" direction="column">
              <Text fontSize="12px">Ingredients:</Text>
<<<<<<< HEAD
              {cocktail.ingredients.map(
                (ingredient: Ingredient, index: number) => (
                  <Text key={index} fontSize="8px">
                    {ingredient.name}
                  </Text>
                ),
              )}
=======
              {cocktail.ingredients.map((ingredient, index) => (
                <Text key={index} fontSize="8px">
                  {ingredient.name}
                </Text>
              ))}
>>>>>>> c71bbd8d2e792ff132f2f6e8e9b68dab39dcb885
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CardSuggestion;
