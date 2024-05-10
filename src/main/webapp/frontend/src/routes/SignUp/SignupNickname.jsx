// src/routes/SignUp/SignupNickname.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { LabelContext } from "./labelDataContext";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup_styles.css";

const SignupNickname = () => {
  const {
    userInfo: { SignupNickname },
    setSignupNicknameInfo,
    prevPage,
    nextPage,
  } = useContext(LabelContext);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(true);

  const handleNicknameChange = (event) => {
    setSignupNicknameInfo("nickname")(event);
  };

  const checkDuplicateNickname = async () => {
    if (!SignupNickname.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/signup/url2", null, {
        params: { mem_nickname: SignupNickname.nickname },
      });

      if (response.data === 0) {
        alert("사용 가능한 닉네임입니다.");
        setIsDuplicateChecked(false);
      } else {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
        setIsDuplicateChecked(true);
      }
    } catch (error) {
      console.error("Error checking duplicate nickname:", error);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <form>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <button
            type="button"
            onClick={prevPage}
            style={{
              marginTop: "30px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowBackIcon />
          </button>
        </Grid>
        <Grid item xs={9}>
          <h4 className="Signupnickname-heading">회원가입</h4>
        </Grid>
        <Grid item xs={9}>
          <input
            type="text"
            className="signup-input"
            placeholder="닉네임을 입력해주세요"
            required
            onChange={handleNicknameChange}
            value={SignupNickname ? SignupNickname.nickname : ""}
          />
        </Grid>
        <Grid item xs={3}>
          <button
            type="button"
            className="signup-button-confirm"
            onClick={checkDuplicateNickname}
            disabled={!SignupNickname.nickname}
          >
            확인
          </button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginTop: 15 }}>
            <button
              type="button"
              className="btn-hover color"
              onClick={nextPage}
              disabled={isDuplicateChecked}
            >
              다음
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupNickname;
