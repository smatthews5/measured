import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Cocktail, Ingredient } from '../interfaces';
import { collectIdsAndDocs } from '../utilities';

const firebaseConfig = {
  apiKey: 'AIzaSyCuTrD5ArJIOjE42O_i2g97oITTuFSjJck',
  authDomain: 'measured-885db.firebaseapp.com',
  databaseURL: 'https://measured-885db.firebaseio.com',
  projectId: 'measured-885db',
  storageBucket: 'measured-885db.appspot.com',
  messagingSenderId: '1087508715694',
  appId: '1:1087508715694:web:441c278ec3c3485f2d753f',
  measurementId: 'G-KKGQHVMWZY',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const getCocktails = async (): Promise<Cocktail[]> => {
  const snapshot = await firestore.collection('cocktails').get();
  const cocktails = snapshot.docs.map(collectIdsAndDocs);
  return cocktails;
};
//returns cocktails by filtered base from dropdown filter
export const getMatchingCocktailsByBase = async (base: string[]): Promise<Cocktail[]> => {
  const snapshot = await firestore
    .collection('cocktails')
    .where('base', 'in', base)
    .get();
  const cocktails: Cocktail[] = snapshot.docs.map(collectIdsAndDocs);
  return cocktails;
};
//returns cocktails by filtered categories from dropdown filter
export const getMatchingCocktailsByCategory = async (category: string[]): Promise<Cocktail[]> => {
  const snapshot = await firestore
    .collection('cocktails')
    .where('categories', 'array-contains-any', category)
    .get();
  const cocktails: Cocktail[] = snapshot.docs.map(collectIdsAndDocs);
  return cocktails;
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  const snapshot = await firestore.collection('ingredients').get();
  const ingredients = snapshot.docs.map(collectIdsAndDocs);
  return ingredients;
};

export const postCocktail = async (newCocktail: Partial<Cocktail>) => {
  await firestore
    .collection('cocktails')
    .add(newCocktail)
    .then((docRef) =>
      console.log('---> New cocktail document created with ID:', docRef.id),
    )
    .catch((error) =>
      console.error('---> Error adding new cocktail to firestore:', error),
    );
};

export default firebase;
