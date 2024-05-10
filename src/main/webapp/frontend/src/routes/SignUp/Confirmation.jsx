import React, { useContext } from "react";
import axios from "axios";
import { LabelContext } from "./labelDataContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "../../styles/Signup_styles.css";

const Confirmation = () => {
  const value = useContext(LabelContext);

  const handleConfirmation = async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    try {
      const formData = {
        id: value.userInfo.SignupId.Id,
        password: value.userInfo.SignupPwd.pwd1,
        nickname: value.userInfo.SignupNickname.nickname,
        travelPreference: value.userInfo.travelPreference.join(", "), // 배열을 문자열로 변환
      };

      const response = await axios.post("/api/registration", formData);

      if (response.status === 200) {
        // 페이지 이동을 위한 리다이렉트 작업
        window.location.href = "/";
      } else {
        throw new Error("Failed to send data to the server");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleConfirmation}>
      <TextField
        label="아이디"
        value={value.userInfo.SignupId.Id}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="비밀번호"
        value={value.userInfo.SignupPwd.pwd1}
        type="password"
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="닉네임"
        value={value.userInfo.SignupNickname.nickname}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="여행 취향"
        value={value.userInfo.travelPreference.join(", ")}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="text primary button group"
        style={{ marginTop: 20 }}
      >
        <Button onClick={() => value.prevPage()} className="Signup-btn-hover">
          이전
        </Button>
        <Button type="submit" className="Signup-btn-hover">
          확인
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default Confirmation;
