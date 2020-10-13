import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
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

export const getCocktails = async () => {
  const snapshot = await firestore.collection('cocktails').get();
  const cocktails = snapshot.docs.map(collectIdsAndDocs);
  return cocktails;
};

export const getMatchingCocktails = async (base: string) => {
  const snapshot = await firestore
    .collection('cocktails')
    .where('base', '==', base)
    .get();
  const cocktails = snapshot.docs.map(collectIdsAndDocs);
  return cocktails;
};

export const getIngredients = async () => {
  const snapshot = await firestore.collection('ingredients').get();
  const ingredients = snapshot.docs.map(collectIdsAndDocs);
  return ingredients;
};

export default firebase;
