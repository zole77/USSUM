import React, { useContext } from "react";
import "../../styles/Signup_styles.css";

import Stepper from "react-stepper-horizontal";
import SignupId from "./SignupId";
import SignupPwd from "./SignupPwd";
import Confirmation from "./Confirmation";
import SignupNickname from "./SignupNickname";
import SignupType from "./SignupType";
import { LabelContext } from "./labelDataContext";

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
      {value.page === 3 && <SignupType />}
      {value.page === 4 && <Confirmation />}
    </div>
  );
};
export default Signup;
