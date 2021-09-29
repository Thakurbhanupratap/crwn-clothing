// import firebase from "firebase/app";
// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyA8mygoJnoQO0hMhM682evcDxYAqlb4mNY",
  authDomain: "crwn-db-73d3d.firebaseapp.com",
  projectId: "crwn-db-73d3d",
  storageBucket: "crwn-db-73d3d.appspot.com",
  messagingSenderId: "246112940267",
  appId: "1:246112940267:web:79d4a9f13d58382a8f8eae",
  measurementId: "G-R9BDKMXC9P",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(`error creating user`, error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
