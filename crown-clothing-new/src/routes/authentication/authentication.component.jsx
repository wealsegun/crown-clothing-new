import './authenticate.styles.scss';
import SignUp from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/signin-form/signin-form.component";

const Authentication = () => {
  
  return (
    <div className="authenticate-container">
      <SignInForm/>
      <SignUp/>
    </div>
  );
};

export default Authentication;
