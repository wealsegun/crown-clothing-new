import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUp from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/signin-form/signin-form.component";
// import { async } from "@firebase/util";cons

const Authentication = () => {
  useEffect(() => {
   ( async() => {
        const response = await getRedirectResult(auth);
        console.log(response);
        if(response)
         {
            const userDocRef = await createUserDocumentFromAuth(response.user);
            console.log(userDocRef);
         }
  })();
  }, []);


  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  //   const SignInRedirect = async() => {
  //     const { user } = await signInWithGoogleRedirect();
  //     // const userDocRef = await createUserDocumentFromAuth(user);
  //     console.log({user});
  //   }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Poppup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignInForm/>
      <SignUp/>
    </div>
  );
};

export default Authentication;
