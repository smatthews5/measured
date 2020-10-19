import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { collectIdsAndDocs } from '../utilities';

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
  console.log('---> RAN A FIREBASE REQUEST AT', new Date());
  return cocktails;
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  const snapshot = await firestore.collection('ingredients').get();
  const ingredients = snapshot.docs.map(collectIdsAndDocs);
  console.log('---> RAN A FIREBASE REQUEST AT', new Date());
  return ingredients;
};

export const postCocktail = async (
  newCocktail: Partial<Cocktail>,
): Promise<void> => {
  console.log('---> RAN A FIREBASE REQUEST AT', new Date());
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

export const createUserProfileDocument = async (user, additionalData) => {
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
    console.log('user from firestore', user);
    const newUser = {
      displayName,
      email,
      photoURL,
      createdAt,
      likedDrinks,
      myIngredients,
      ...additionalData
    };
    console.log('newUser', newUser);
    try {
      await userRef.set(newUser);
    } catch (error) {
      console.error('error creating user', error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection('users').doc(uid).get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error('error fetching users', error.message);
  }
};

export default firebase;
