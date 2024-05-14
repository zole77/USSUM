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
  const [email, setEmail] = useState(""); // 현재 이메일 입력 값

  const isInputValid = (input, regex) => input.length > 0 && regex.test(input);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setSignupIdInfo("Id")(event);
  };

  const duplicationCheckAPI = async (email) => {
    try {
      console.log(`Checking duplicate email: ${email}`);
      const response = await axios.post(
          "/signup/url",
          {},
          {
            params: { mem_id: email },
          }
      );
      console.log(`Response from server: `, response.data);
      return response.data === 0;
    } catch (error) {
      console.error(
          "Error checking duplicate ID:",
          error.response ? error.response.data : error.message
      );
      return false;
    }
  };

  const handleCheckDuplicate = async () => {
    if (!email || email.trim() === "") {
      alert("이메일을 입력해주세요.");
    } else if (!isInputValid(email, EMAIL_REGEX)) {
      alert("올바른 이메일 형식이 아닙니다.");
    } else {
      const isUsable = await duplicationCheckAPI(email);
      setIsDuplicateChecked(true); // 중복 확인 완료
      setIdAvailable(isUsable);

      if (isUsable) {
        alert("사용 가능한 아이디입니다.");
      } else {
        alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
      }
    }
  };

  const signUp = () => {
    if (!isInputValid(email, EMAIL_REGEX)) {
      alert("올바른 이메일 형식이 아닙니다.");
    } else if (!isDuplicateChecked || !idAvailable) {
      alert("아이디 중복 확인을 하십시오.");
    } else {
      nextPage();
    }
  };

  return (
      <form>
        <h4 className="Signup-heading">회원가입</h4>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <input
                type="email"
                className={`signup-input ${
                    !isInputValid(email, EMAIL_REGEX) && email.length > 0
                        ? "input-error"
                        : ""
                }`}
                placeholder="email@example.com"
                value={email}
                onChange={handleEmailChange}
                required
            />
            {!isInputValid(email, EMAIL_REGEX) && email.length > 0 && (
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
            >
              확인
            </button>
          </Grid>
        </Grid>
        <button
            type="button"
            onClick={signUp}
            disabled={
                !isInputValid(email, EMAIL_REGEX) ||
                email.trim() === "" ||
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
