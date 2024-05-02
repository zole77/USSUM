import React, { useContext } from "react";
import { LabelContext } from "./labelDataContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "../../styles/Join_styles.css"

const Confirmation = () => {
  const value = useContext(LabelContext);

  console.log(value, "value");
  return (
    <>
      <h6> 아이디</h6>
      <div className="child">
        <TextField
          style={{ margin: 8, width: "93%" }}
          fullWidth
          value={value.userInfo.JoinId.Id}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <h6> 비밀번호</h6>
      <div className="child">
        <TextField
          style={{ margin: 8, width: "93%" }}
          fullWidth
          value={value.userInfo.JoinPwd.pwd1}
          type="password"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          style={{ margin: 8, width: "93%" }}
          label="비밀번호 확인"
          fullWidth
          margin="normal"
          value={value.userInfo.JoinPwd.pwd2}
          type="password"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <h6> 닉네임</h6>
      <div className="child">
        <TextField
          style={{ margin: 8, width: "93%" }}
          fullWidth
          margin="normal"
          value={value.userInfo.JoinNickname.nickname}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <h6> 여행 취향</h6>
      <div className="child">
        {/* 여행 취향을 직접 확인 */}
        <TextField
          id="travelPreference"
          style={{ margin: 8, width: "93%" }}
          fullWidth
          value={value.userInfo.travelPreference.join(", ")}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="text primary button group"
        style={{ marginTop: 15 }}
      >
        <Button onClick={() => value.prevPage()} style={{ margin: 25 }}>
          Previous
        </Button>
        <Button onClick={() => value.nextPage()} style={{ margin: 25 }}>
          Confirm
        </Button>
      </ButtonGroup>
    </>
  );
};
export default Confirmation;
