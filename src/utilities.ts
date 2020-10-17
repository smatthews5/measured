import { Cocktail, Ingredient, Relevance } from './interfaces';

export const collectIdsAndDocs = (doc: any) => {
  return { id: doc.id, ...doc.data() };
};

export const removeDuplicatesAndRankResults = (allMatches: Cocktail[]) => {
  try {
    const relevance: Relevance = {};
    const uniqueCocktails: Cocktail[] = [];
    allMatches.forEach((cocktail) => {
      if (relevance[cocktail.id]) {
        relevance[cocktail.id]++;
      } else {
        relevance[cocktail.id] = 1;
        uniqueCocktails.push(cocktail);
      }
    });
    const rankedCocktails = uniqueCocktails
      .map((cocktail) => ({
        ...cocktail,
        relevance: cocktail.hasOwnProperty('relevance')
          ? cocktail.relevance + relevance[cocktail.id]
          : relevance[cocktail.id],
      }))
      .sort((a, b) => b.relevance - a.relevance);
    return rankedCocktails;
  } catch (error) {
    console.log('---> error ranking and removing duplicates', error);
  }
};

export const shuffleOrder = (content: Ingredient[] | Cocktail[]) => {
  let current = content.length;
  let temp;
  let random;

  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current -= 1;
    temp = content[current];
    content[current] = content[random];
    content[random] = temp;
  }
  return content;
};

export const splitAndSearch = (cocktail: Cocktail, searchTerms: string[]) => {
  let matchedWords = 0;
  const splitCocktailName = cocktail.name.split(' ');
  splitCocktailName.forEach((word) => {
    if (searchTerms.includes(word)) matchedWords++;
  });
  const ingredients = cocktail.ingredientsList;
  ingredients.forEach((ingredient) => {
    const ingredientWords = ingredient.split(' ');
    ingredientWords.forEach((word) => {
      if (searchTerms.includes(word)) matchedWords++;
    });
  });
  const garnishWords = cocktail.garnish.description.split(' ');
  garnishWords.forEach((word) => {
    if (searchTerms.includes(word)) matchedWords++;
  });
  cocktail.relevance = matchedWords;
  return matchedWords;
};
