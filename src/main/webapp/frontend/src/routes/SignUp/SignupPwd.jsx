import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
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
      validatePassword(value) ? "" : "※문자, 숫자, 특수문자 포함 8글자 이상",
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
        setPasswordError("※문자, 숫자, 특수문자 포함 8글자 이상");
      }

      if (userInfo.SignupPwd.pwd1 !== userInfo.SignupPwd.pwd2) {
        setConfirmError("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <form>
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
        <Grid container spacing={2} sx={{ height: "170px" }}>
          <Grid item xs={12} sx={{ height: "80px" }}>
            <div className="form-group-horizontal">
              <input
                type={showPassword1 ? "text" : "password"}
                className={`signup-input ${passwordError ? "input-error" : ""}`}
                placeholder="비밀번호를 입력하세요"
                onChange={handlePasswordChange}
                value={userInfo.SignupPwd.pwd1}
                required
              />
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword1(!showPassword1)}
                  edge="end"
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
            {passwordError && (
              <small className="input-helper-text">{passwordError}</small>
            )}
          </Grid>
          <Grid item xs={12} sx={{ height: "100px" }}>
            <div className="form-group-horizontal">
              <input
                type={showPassword2 ? "text" : "password"}
                className={`signup-input ${confirmError ? "input-error" : ""}`}
                placeholder="비밀번호 확인"
                onChange={handleConfirmPasswordChange}
                value={userInfo.SignupPwd.pwd2}
                required
              />
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword2(!showPassword2)}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
            {confirmError && (
              <small className="input-helper-text">{confirmError}</small>
            )}
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: 15 }}>
              <button
                type="button"
                className="btn-hover color fixed-bottom"
                onClick={handleSubmit}
              >
                다음
              </button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupPwd;
