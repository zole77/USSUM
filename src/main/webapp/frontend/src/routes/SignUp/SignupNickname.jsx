import React, { useContext, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LabelContext } from "./labelDataContext";
import "../../styles/Signup_styles.css";

const SignupNickname = () => {
  const {
    userInfo: { SignupNickname },
    setSignupNicknameInfo,
    prevPage,
    nextPage,
  } = useContext(LabelContext);

  const [nicknameAvailable, setNicknameAvailable] = useState(false); // 닉네임 사용 가능 여부
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 여부

  const checkDuplicate = async () => {
    if (!SignupNickname.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/signup/checkNickname", null, {
        params: { mem_nickname: SignupNickname.nickname },
      });

      setIsDuplicateChecked(true); // 중복 확인 완료 표시

      if (response.data === 0) {
        alert("사용 가능한 닉네임입니다.");
        setNicknameAvailable(true); // 닉네임 사용 가능
      } else {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
        setNicknameAvailable(false); // 닉네임 사용 불가능
      }
    } catch (error) {
      console.error(
        "Error checking duplicate nickname:",
        error.response ? error.response.data : error.message,
      );
      console.log("Error details:", error.response ? error.response : error); // 오류 상세 내용을 console.log로 출력
      alert(
        "중복 확인 중 오류가 발생했습니다: " +
          (error.response ? error.response.data : error.message),
      );
    }
  };

  const handleCheckDuplicate = () => checkDuplicate();

  const handleNextPage = () => {
    if (!SignupNickname.nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!nicknameAvailable) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    nextPage();
  };

  const handleNicknameChange = (event) => {
    setSignupNicknameInfo("nickname")(event);
    setNicknameAvailable(false);
    setIsDuplicateChecked(false);
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
            onClick={handleCheckDuplicate}
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
              onClick={handleNextPage}
              disabled={
                !SignupNickname.nickname ||
                !nicknameAvailable ||
                !isDuplicateChecked
              }
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
