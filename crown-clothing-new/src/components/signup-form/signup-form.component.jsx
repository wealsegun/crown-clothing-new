import { useContext, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./signup-form.styles.scss";
import { UserContext } from "../../contexts/user.context";

const signUpForm = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(signUpForm);
  const { displayName, email, password, confirmPassword } = formFields;


  const {setCurrentUser} = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formFields);

    if (!validatePassword(formFields.password, formFields.confirmPassword)) {
      alert("passwords do not match");
      return;
    }

    const resetFormFields = () => {
      setFormFields(signUpForm);
    };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);

      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const validatePassword = (password, confirmPassword) => {
    return password.localeCompare(confirmPassword) === 0;
  };

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span> Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            label={"Display Name"}
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
        </div>
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
        <div>
          <FormInput
            label={"Confirm Password"}
            required
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
        </div>
        <div>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
