import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LabelContext } from "./labelDataContext";

const JoinPwd = () => {
  const { userInfo, setJoinPwdInfo, nextPage, prevPage } =
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
      userInfo.JoinPwd.pwd1 === userInfo.JoinPwd.pwd2 &&
      validatePassword(userInfo.JoinPwd.pwd1)
    ) {
      nextPage();
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setJoinPwdInfo("pwd1")(event);

    if (!validatePassword(value)) {
      setPasswordError(
        "비밀번호는 8자 이상이어야 하며, 문자, 숫자, 특수문자 중 2가지를 포함해야 합니다.",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setJoinPwdInfo("pwd2")(event);

    if (value !== userInfo.JoinPwd.pwd1) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };

  return (
    <form>
      <h4>회원가입</h4>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            label="비밀번호를 입력하세요"
            fullWidth
            margin="normal"
            required
            type={showPassword1 ? "text" : "password"}
            onChange={handlePasswordChange}
            value={userInfo.JoinPwd.pwd1}
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            label="비밀번호 확인"
            fullWidth
            margin="normal"
            required
            type={showPassword2 ? "text" : "password"}
            onChange={handleConfirmPasswordChange}
            value={userInfo.JoinPwd.pwd2}
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
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="text primary button group"
        style={{ marginTop: 15 }}
      >
        <Button
          onClick={prevPage}
          style={{ margin: 25 }}
          className="join-btn-hover color"
        >
          이전
        </Button>
        <Button
          onClick={handleSubmit}
          style={{ margin: 25 }}
          className="join-btn-hover color"
          disabled={
            !!passwordError ||
            !!confirmError ||
            userInfo.JoinPwd.pwd1.length === 0 ||
            userInfo.JoinPwd.pwd2.length === 0
          }
        >
          다음
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default JoinPwd;
