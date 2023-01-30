import { async } from "@firebase/util";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const signUpForm = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [formFields, setFormFields] = useState(signUpForm);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formFields);
    if (!validatePassword(formFields.password, formFields.confirmPassword)) {
      alert("passwords do not match");
      return;
    }

    const resetFormFields = () => {
        setFormFields(signUpForm);
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
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
    <div>
      <h1> Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Display Name</label>
          <input
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            required
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;