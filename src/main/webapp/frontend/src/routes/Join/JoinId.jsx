import React, { useState, useContext } from "react";
import { LabelContext } from "./labelDataContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import "../../styles/Join_styles.css"

const JoinId = (props) => {
  const value = useContext(LabelContext);
  const joinId = value.userInfo.JoinId;
  const [idAvailable, setIdAvailable] = useState(false); // 아이디 사용 가능 여부
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 여부

  // 이메일 유효성 검사 정규식
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 중복 확인 함수
  const duplicationCheck = () => {
    // 실제로 백엔드와 통신하여 중복 확인을 수행해야 합니다.
    // 임시로 true 또는 false를 반환하는 것으로 대체합니다.
    const response = false; // 예시: 백엔드로부터 받은 응답
    setIsDuplicateChecked(true); // 중복 확인 버튼이 클릭되었음을 표시

    // 중복 확인 결과에 따라 메시지를 alert로
    if (!response) {
      alert("사용 가능한 아이디입니다.");
      setIdAvailable(true); // 중복이 없으면 아이디 사용 가능
    } else {
      alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
      setIdAvailable(false); // 중복이 있으면 아이디 사용 불가능
    }
  };

  // 입력값이 유효한지 확인하는 함수
  const isInputValid = (inputValue, regex) => {
    return inputValue.length > 0 && regex.test(inputValue);
  };

  // 중복 확인 버튼 클릭 시 실행되는 함수
  const handleCheckDuplicate = () => {
    duplicationCheck();
  };

  return (
    <form>
      <h4>회원가입</h4>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            label="아이디(이메일)을 입력해주세요"
            style={{ width: "100%" }}
            fullWidth
            required
            onChange={(event) => value.setJoinIdInfo("Id")(event)} // 수정된 부분
            value={joinId.Id}
            error={
              !isInputValid(joinId.Id, EMAIL_REGEX) && joinId.Id.length > 0
            }
            helperText={
              !isInputValid(joinId.Id, EMAIL_REGEX) && joinId.Id.length > 0
                ? "올바른 이메일 형식이 아닙니다."
                : ""
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={handleCheckDuplicate}
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px", height: "56px" }}
          >
            중복 확인
          </Button>
        </Grid>
      </Grid>

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="text primary button group"
        style={{ marginTop: 15 }}
      >
        <Button
          disabled={
            !isInputValid(joinId.Id, EMAIL_REGEX) ||
            joinId.Id.trim() === "" ||
            !idAvailable ||
            !isDuplicateChecked // 중복 확인을 하지 않았으면 비활성화
          }
          onClick={() => value.nextPage()}
          style={{ margin: 25 }}
        >
          Next
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default JoinId;
