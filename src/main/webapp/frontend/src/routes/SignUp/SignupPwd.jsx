import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LabelContext } from "./labelDataContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupPwd = () => {
  const { userInfo, setSignupPwdInfo, nextPage, prevPage } =
    useContext(LabelContext);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    if (
      userInfo.SignupPwd.pwd1 === userInfo.SignupPwd.pwd2 &&
      validatePassword(userInfo.SignupPwd.pwd1)
    ) {
      nextPage();
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setSignupPwdInfo("pwd1")(event);

    if (!validatePassword(value)) {
      setPasswordError("※문자, 숫자, 특수문자 포함 8글자 이상");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setSignupPwdInfo("pwd2")(event);

    if (value !== userInfo.SignupPwd.pwd1) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };
  return (
    <form>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Button
            onClick={() => prevPage()} // 'value.prevPage()' 대신 'prevPage()'를 사용합니다.
            style={{ marginTop: "50px" }}
            className="Signup-btn-hover color"
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs={9}>
          <h4 className="Signuppwd-heading">회원가입</h4>
        </Grid>
        <Grid item xs={12}>
          <Grid alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="비밀번호를 입력하세요"
                fullWidth
                margin="normal"
                type={showPassword1 ? "text" : "password"}
                onChange={handlePasswordChange}
                value={userInfo.SignupPwd.pwd1}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword1(!showPassword1)}
                        edge="end"
                      >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="비밀번호 확인"
                fullWidth
                margin="normal"
                required
                type={showPassword2 ? "text" : "password"}
                onChange={handleConfirmPasswordChange}
                value={userInfo.SignupPwd.pwd2}
                error={!!confirmError}
                helperText={confirmError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword2(!showPassword2)}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginTop: 15 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className="btn-hover color"
            >
              다음
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
export default SignupPwd;
