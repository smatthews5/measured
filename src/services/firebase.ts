/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { collectIdsAndDocs } from '../utilities';
import { User } from '../interfaces';

import { Cocktail, Ingredient } from '../interfaces';

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
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(provider);
export const signOut = (): Promise<void> => auth.signOut();

export const getCocktails = async (): Promise<Cocktail[]> => {
  const snapshot = await firestore.collection('cocktails').get();
  const cocktails = snapshot.docs.map(collectIdsAndDocs);
  // console.log('---> RAN A FIREBASE REQUEST AT', new Date());
  return cocktails;
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  const snapshot = await firestore.collection('ingredients').get();
  const ingredients = snapshot.docs.map(collectIdsAndDocs);
  // console.log('---> RAN A FIREBASE REQUEST AT', new Date());
  return ingredients;
};

export const postCocktail = async (
  newCocktail: Partial<Cocktail>,
): Promise<void> => {
  // console.log('---> RAN A FIREBASE REQUEST AT', new Date());
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

export const createUserProfileDocument = async (
  user: firebase.User,
  additionalData: { [key: string]: string },
): Promise<User | undefined> => {
  if (!user) return;
  // get a reference to the place in the database where the user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);
  // Go and fetch the document from that location
  const snapshot = await userRef.get();
  // if the user does not exist set a user
  if (!snapshot.exists) {
    const likedDrinks: Cocktail[] = [];
    const myIngredients: Ingredient[] = [];
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    const newUser = {
      displayName,
      email,
      photoURL,
      createdAt,
      likedDrinks,
      myIngredients,
      ...additionalData,
    };
    try {
      await userRef.set(newUser);
    } catch (error) {
      console.error('error creating user', error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (
  uid: string,
): Promise<User | undefined> => {
  if (!uid) return undefined;
  try {
    const userDocument = await firestore.collection('users').doc(uid).get();

    const data = userDocument.data();

    if (data) {
      return {
        uid: uid,
        displayName: data.displayName,
        email: data.email,
        myIngredients: data.myIngredients,
        likedDrinks: data.likedDrinks,
        photoURL: data.photoURL,
        createdAt: data.createdAt,
      };
    }
  } catch (error) {
    console.error('error fetching users', error.message);
  }
};

export const addIngredient = async (
  uid: string,
  ingredient: string,
): Promise<null | undefined> => {
  if (!uid) return null;
  try {
    const ingredientsRef = firestore.collection('users').doc(uid);
    await ingredientsRef.update({
      myIngredients: firebase.firestore.FieldValue.arrayUnion(ingredient),
    });
    console.log('successfully added ingredient');
  } catch (error) {
    console.error('error updating my ingredients', error.message);
  }
};

export const removeIngredient = async (
  uid: string,
  ingredient: string,
): Promise<null | undefined> => {
  if (!uid) return null;
  try {
    const ingredientsRef = firestore.collection('users').doc(uid);
    await ingredientsRef.update({
      myIngredients: firebase.firestore.FieldValue.arrayRemove(ingredient),
    });
    console.log('successfully removed ingredient');
  } catch (error) {
    console.error('error updating my ingredients', error.message);
  }
};

export const addCocktail = async (
  uid: string,
  cocktail: string,
): Promise<null | undefined> => {
  if (!uid) return null;
  try {
    const userRef = firestore.collection('users').doc(uid);
    await userRef.update({
      likedDrinks: firebase.firestore.FieldValue.arrayUnion(cocktail),
    });
    console.log('successfully added cocktail');
  } catch (error) {
    console.error('error adding cocktail', error.message);
  }
};

export const removeCocktail = async (
  uid: string,
  cocktail: string,
): Promise<null | undefined> => {
  if (!uid) return null;
  try {
    const userRef = firestore.collection('users').doc(uid);
    await userRef.update({
      likedDrinks: firebase.firestore.FieldValue.arrayRemove(cocktail),
    });
    console.log('successfully removed cocktail');
  } catch (error) {
    console.error('error removing cocktail', error.message);
  }
};

export default firebase;
