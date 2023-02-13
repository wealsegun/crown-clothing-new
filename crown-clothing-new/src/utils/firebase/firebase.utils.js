// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ0OdY5hcMR-JGDv8FEMHzEtJeIWe6EDc",
  authDomain: "crwn-clothing-db-1f93e.firebaseapp.com",
  projectId: "crwn-clothing-db-1f93e",
  storageBucket: "crwn-clothing-db-1f93e.appspot.com",
  messagingSenderId: "786811572084",
  appId: "1:786811572084:web:baca352fe345292e02e621",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user  data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email, emailVerified, phoneNumber, photoURL } =
      userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        emailVerified,
        email,
        phoneNumber,
        photoURL,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};

export const signInAuthWithEmailAndPassword = async(email, password) =>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
