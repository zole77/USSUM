import React, { useState, useContext } from "react";
import { LabelContext } from "./labelDataContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "../../styles/Signup_styles.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignupId = () => {
  const {
    userInfo: { SignupId },
    setSignupIdInfo,
    nextPage,
  } = useContext(LabelContext);
  const [idAvailable, setIdAvailable] = useState(false); // 아이디 사용 가능 여부
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 여부

  const isInputValid = (input, regex) => input.length > 0 && regex.test(input);

  const checkDuplicate = () => {
    // 실제로 백엔드와 통신하여 중복 확인을 수행해야 합니다.
    // 임시로 true 또는 false를 반환하는 것으로 대체합니다.
    const response = false; // 예시: 백엔드로부터 받은 응답

    setIsDuplicateChecked(true); // 중복 확인이 완료됨을 표시
    if (!response) {
      alert("사용 가능한 아이디입니다.");
      setIdAvailable(true); // 아이디 사용 가능
    } else {
      alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
      setIdAvailable(false); // 아이디 사용 불가능
    }
  };

  const handleCheckDuplicate = () => checkDuplicate();

  return (
    <form>
      <h4 className="Signup-heading">회원가입</h4>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            label="아이디(이메일)을 입력해주세요"
            style={{ width: "100%" }}
            fullWidth
            required
            value={SignupId.Id}
            onChange={(event) => setSignupIdInfo("Id")(event)}
            error={
              !isInputValid(SignupId.Id, EMAIL_REGEX) && SignupId.Id.length > 0
            }
            helperText={
              !isInputValid(SignupId.Id, EMAIL_REGEX) && SignupId.Id.length > 0
                ? "올바른 이메일 형식이 아닙니다."
                : ""
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={handleCheckDuplicate}
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px", height: "56px" }}
            disabled={
              !isInputValid(SignupId.Id, EMAIL_REGEX) ||
              SignupId.Id.trim() === ""
            }
          >
            확인
          </Button>
        </Grid>
      </Grid>
      <Button
        disabled={
          !isInputValid(SignupId.Id, EMAIL_REGEX) ||
          SignupId.Id.trim() === "" ||
          !idAvailable ||
          !isDuplicateChecked
        }
        onClick={nextPage}
        style={{ margin: 25 }}
        className="btn-hover color"
      >
        다음
      </Button>
    </form>
  );
};

export default SignupId;
