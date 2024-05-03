import React, { useContext } from "react";
import axios from "axios";
import { LabelContext } from "./labelDataContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import "../../styles/Join_styles.css";

const Confirmation = () => {
  const value = useContext(LabelContext);

  const handleConfirmation = async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    try {
      const formData = {
        id: value.userInfo.JoinId.Id,
        password: value.userInfo.JoinPwd.pwd1,
        nickname: value.userInfo.JoinNickname.nickname,
        travelPreference: value.userInfo.travelPreference.join(", "),
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
      // 에러 발생 시 적절한 처리
    }
  };

  return (
    <form onSubmit={handleConfirmation}>
      <h6> 아이디</h6>
      <div className="child">
        <TextField
          style={{ margin: 8, width: "93%" }}
          fullWidth
          value={value.userInfo.JoinId.Id}
          inputProps={{
            readOnly: true,
          }}
        />
      </div>
      <h6> 비밀번호</h6>
      <div className="child">
        <TextField
          style={{ margin: 8, width: "93%" }}
          fullWidth
          value={value.userInfo.JoinPwd.pwd1}
          type="password"
          inputProps={{
            readOnly: true,
          }}
        />
      </div>
      <h6> 닉네임</h6>
      <div className="child">
        <TextField
          style={{ margin: 8, width: "93%" }}
          fullWidth
          margin="normal"
          value={value.userInfo.JoinNickname.nickname}
          inputProps={{
            readOnly: true,
          }}
        />
      </div>
      <h6> 여행 취향</h6>
      <div className="child">
        <TextField
          id="travelPreference"
          style={{ margin: 8, width: "93%" }}
          fullWidth
          value={value.userInfo.travelPreference.join(", ")}
          inputProps={{
            readOnly: true,
          }}
        />
      </div>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="text primary button group"
        style={{ marginTop: 15 }}
      >
        <Button
          type="button"
          onClick={() => value.prevPage()}
          style={{ margin: 25 }}
          className="join-btn-hover color"
        >
          이전
        </Button>
        <Button
          type="submit"
          style={{ margin: 25 }}
          className="join-btn-hover color"
        >
          확인
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default Confirmation;
