// Signup.js
import React, { useContext } from "react";
import "../../styles/Signup_styles.css";
import Stepper from "react-stepper-horizontal";
import SignupId from "./SignupId";
import SignupPwd from "./SignupPwd";
import Confirmation from "./Confirmation";
import SignupNickname from "./SignupNickname";
import SignupType from "./SignupType";
import { LabelContext } from "./labelDataContext";
import SignupGender from "./SignupGender";

const Signup = (props) => {
  const value = useContext(LabelContext);

  return (
    <div className="Signup">
      {value.page !== 5 && (
        <Stepper steps={value.steps} activeStep={value.page} />
      )}
      {value.page === 0 && <SignupId />}
      {value.page === 1 && <SignupPwd />}
      {value.page === 2 && <SignupNickname />}
      {value.page === 3 && <SignupGender />}
      {value.page === 4 && <SignupType />}
      {value.page === 5 && <Confirmation />}
    </div>
  );
};

export default Signup;
