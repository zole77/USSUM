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

  const handleNicknameChange = (event) => {
    setSignupNicknameInfo("nickname")(event);
  };

  return (
      <div className="signup-container">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={3}>
            <button
                type="button"
                className="signup-back-button"
                onClick={prevPage}
            >
              <ArrowBackIcon />
            </button>
          </Grid>
          <Grid item xs={6}>
            <h4 className="Signupnickname-heading">회원가입</h4>
          </Grid>
          <Grid item xs={3}></Grid>
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
              >
                다음
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
  );
};

export default SignupNickname;
