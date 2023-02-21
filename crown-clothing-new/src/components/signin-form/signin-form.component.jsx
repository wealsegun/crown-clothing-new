import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  auth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
// import {  } from "react";
import { getRedirectResult } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./signin-form.styles.scss";
import { UserContext } from "../../contexts/user.context";
const signInForm = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(signInForm);
  const { email, password } = formFields;

  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  // const val = useContext(UserContext);
  // console.log(val);
  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(signInForm);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogin = async (event) => {
    console.log(event);
    event.preventDefault();
    console.log(formFields);
    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
      setCurrentUser(response);
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");

          break;
        case "auth/user-not-found":
          alert("no user associated with this email");

          break;

        default:
          console.log(error);
          break;
      }
    }
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
      {/* <h1>Sign In Page</h1> */}
      <h2>Already have an account</h2>
      <span> Sign in with your email and password</span>
      <form onSubmit={handleLogin}>
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
          <Button type="button" buttonType={"google"} onClick={logGoogleUser}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
