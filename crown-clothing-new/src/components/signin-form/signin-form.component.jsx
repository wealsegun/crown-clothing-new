import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  auth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./signin-form.styles.scss";
const signInForm = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(signInForm);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(signInForm);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    // console.log(userDocRef);
  };

  return (
    <div className="sign-in-container">
      <h1>Sign In Page</h1>
      {/* <h2>Don't have an account</h2> */}
      <span> Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            label={"Email"}
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
        </div>
        <div>
          <FormInput
            label={"Password"}
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>
        <div className="btn-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType={"google"} onClick={logGoogleUser}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
