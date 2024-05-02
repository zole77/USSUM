import React, { useContext } from "react";
import "../../styles/Join_styles.css"

import Stepper from "react-stepper-horizontal";
import JoinId from "./JoinId";
import JoinPwd from "./JoinPwd";
import Confirmation from "./Confirmation";
import JoinNickname from "./JoinNickname";
import JoinType from "./JoinType";
import { LabelContext } from "./labelDataContext";

const Join = (props) => {
  const value = useContext(LabelContext);
  return (
    <div className="Join">
      {value.page !== 5 && (
        <Stepper steps={value.steps} activeStep={value.page} />
      )}
      {value.page === 0 && <JoinId />}
      {value.page === 1 && <JoinPwd />}
      {value.page === 2 && <JoinNickname />}
      {value.page === 3 && <JoinType />}
      {value.page === 4 && <Confirmation />}
    </div>
  );
};
export default Join;
