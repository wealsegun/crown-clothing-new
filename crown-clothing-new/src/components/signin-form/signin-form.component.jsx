import { useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './signin-form.styles.scss';
const signInForm= {
    email: '',
    password: ''
};
const SignInForm = () => {

    const [formFields, setFormFields] = useState(signInForm);
  const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(name);
        setFormFields({ ...formFields, [name]: value });
      };

      const handleSubmit = () => {

      }
    
    return (
        <div className="sign-in-container">
        <h2>Don't have an account</h2>
        <span> Sign up with your email and password</span>
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
          <div>
          <Button type="submit">Sign Up</Button>
            <Button buttonType={'google'} type="submit">Google Sign in</Button>
          </div>
        </form>
      </div>
    )
}

export default SignInForm;