// src/routes/SignUp/SignupId.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { LabelContext } from "./labelDataContext";
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

  const checkDuplicate = async () => {
    if (!SignupId.Id) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/signup/url", null, {
        params: { mem_id: SignupId.Id },
      });

      setIsDuplicateChecked(true); // 중복 확인 완료 표시

      if (response.data === 0) {
        alert("사용 가능한 아이디입니다.");
        setIdAvailable(true); // 아이디 사용 가능
      } else {
        alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
        setIdAvailable(false); // 아이디 사용 불가능
      }
    } catch (error) {
      console.error(
        "Error checking duplicate ID:",
        error.response ? error.response.data : error.message,
      );
      alert(
        "중복 확인 중 오류가 발생했습니다: " +
          (error.response ? error.response.data : error.message),
      );
    }
  };

  const handleCheckDuplicate = () => checkDuplicate();

  return (
    <form>
      <h4 className="Signup-heading">회원가입</h4>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <input
            type="email"
            className={`signup-input ${
              !isInputValid(SignupId.Id, EMAIL_REGEX) && SignupId.Id.length > 0
                ? "input-error"
                : ""
            }`}
            placeholder="email@example.com"
            value={SignupId.Id}
            onChange={(event) => setSignupIdInfo("Id")(event)}
            required
          />
          {!isInputValid(SignupId.Id, EMAIL_REGEX) &&
            SignupId.Id.length > 0 && (
              <small className="input-helper-text">
                올바른 이메일 형식이 아닙니다.
              </small>
            )}
        </Grid>
        <Grid item xs={3}>
          <button
            type="button"
            className="signup-button-confirm"
            onClick={handleCheckDuplicate}
            disabled={
              !isInputValid(SignupId.Id, EMAIL_REGEX) ||
              SignupId.Id.trim() === ""
            }
          >
            확인
          </button>
        </Grid>
      </Grid>
      <button
        type="button"
        onClick={nextPage}
        disabled={
          !isInputValid(SignupId.Id, EMAIL_REGEX) ||
          SignupId.Id.trim() === "" ||
          !idAvailable ||
          !isDuplicateChecked
        }
        className="btn-hover color"
      >
        다음
      </button>
    </form>
  );
};

export default SignupId;
