import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LabelContext } from "./labelDataContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup_styles.css";

const SignupPwd = () => {
  const { userInfo, setSignupPwdInfo, nextPage, prevPage } =
    useContext(LabelContext);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

  const validatePassword = (password) => passwordRegex.test(password);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setSignupPwdInfo("pwd1")(event);

    setPasswordError(
      validatePassword(value)
        ? ""
        : "※문자, 숫자, 특수문자 중 2가지 포함 8글자 이상",
    );
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setSignupPwdInfo("pwd2")(event);

    setConfirmError(
      value === userInfo.SignupPwd.pwd1 ? "" : "비밀번호가 일치하지 않습니다.",
    );
  };

  const handleSubmit = () => {
    if (
      userInfo.SignupPwd.pwd1 === userInfo.SignupPwd.pwd2 &&
      validatePassword(userInfo.SignupPwd.pwd1)
    ) {
      nextPage();
    } else {
      if (!validatePassword(userInfo.SignupPwd.pwd1)) {
        setPasswordError("※문자, 숫자, 특수문자 중 2가지 포함 8글자 이상");
      }

      if (userInfo.SignupPwd.pwd1 !== userInfo.SignupPwd.pwd2) {
        setConfirmError("비밀번호가 일치하지 않습니다.");
      }
    }
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
          <h4 className="Signuppwd-heading">회원가입</h4>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sx={{ position: "relative" }}>
              <input
                type={showPassword1 ? "text" : "password"}
                className={`signup-input signup-input-pwd ${passwordError ? "input-error" : ""}`}
                placeholder="비밀번호를 입력하세요"
                onChange={handlePasswordChange}
                value={userInfo.SignupPwd.pwd1}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  paddingRight: "40px",
                  border: "1px solid #5ac7c7",
                  borderRadius: "5px",
                  backgroundColor: "#e8f8f8",
                }}
              />
              <IconButton
                onClick={() => setShowPassword1(!showPassword1)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              {passwordError && (
                <small className="input-helper-text">{passwordError}</small>
              )}
            </Grid>
            <Grid item xs={12} sx={{ position: "relative" }}>
              <input
                type={showPassword2 ? "text" : "password"}
                className={`signup-input signup-input-pwd ${confirmError ? "input-error" : ""}`}
                placeholder="비밀번호 확인"
                onChange={handleConfirmPasswordChange}
                value={userInfo.SignupPwd.pwd2}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  paddingRight: "40px",
                  border: "1px solid #5ac7c7",
                  borderRadius: "5px",
                  backgroundColor: "#e8f8f8",
                }}
              />
              <IconButton
                onClick={() => setShowPassword2(!showPassword2)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              {confirmError && (
                <small className="input-helper-text">{confirmError}</small>
              )}
            </Grid>
            <Grid item xs={12}>
              <button
                type="button"
                className="btn-hover color"
                onClick={handleSubmit}
              >
                다음
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupPwd;
