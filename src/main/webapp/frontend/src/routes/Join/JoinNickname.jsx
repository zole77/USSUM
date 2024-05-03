import React, { useContext, useState } from "react";
import { LabelContext } from "./labelDataContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import "../../styles/Join_styles.css"

const JoinNickname = (props) => {
  const value = useContext(LabelContext);
  const joinNickname = value.userInfo.JoinNickname;
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(true); // 중복 확인 여부

  // 중복 확인 함수
  const duplicationCheck = () => {
    // 실제로 백엔드와 통신하여 중복 확인을 수행해야 합니다.
    // 임시로 true 또는 false를 반환하는 것으로 대체합니다.
    const response = false; // 예시: 백엔드로부터 받은 응답

    // 중복 확인 결과에 따라 알림 창을 띄우고 중복 확인 여부를 설정
    if (!response) {
      alert("사용 가능한 닉네임입니다.");
      setIsDuplicateChecked(false); // 중복 확인 결과가 false이므로 버튼을 활성화
    } else {
      alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
      setIsDuplicateChecked(true); // 중복 확인 결과가 true이므로 버튼을 비활성화
    }
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
            label="닉네임을 입력해주세요"
            style={{ width: "100%" }}
            fullWidth
            required
            onChange={(event) => value.setJoinNicknameInfo("nickname")(event)}
            value={joinNickname ? joinNickname.nickname : ""}
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
        <Button onClick={() => value.prevPage()} style={{ margin: 25 }}>
          Previous
        </Button>
        <Button
          disabled={isDuplicateChecked} // 중복 확인 후 결과값이 true일 때만 버튼 비활성화.
          onClick={() => value.nextPage()}
          style={{ margin: 25 }}
        >
          Next
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default JoinNickname;
