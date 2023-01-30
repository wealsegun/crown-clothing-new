// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
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
