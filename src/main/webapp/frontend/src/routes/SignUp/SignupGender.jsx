import React, { useContext, useState } from "react";
import { LabelContext } from "./labelDataContext";
import { Grid, Radio, FormControlLabel } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup_styles.css";

const SignupGender = () => {
  const { userInfo, setUserInfo, nextPage, prevPage } =
    useContext(LabelContext);
  const [selectedGender, setSelectedGender] = useState(userInfo.gender || "");

  const handleRadioChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className="signup-container">
      <Grid container spacing={3} alignItems="center" justifyContent="center">
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
        <Grid item xs={12}>
          <form>
            <Grid container spacing={2} alignItems="center">
              {["남성", "여성"].map((gender, idx) => (
                <Grid item xs={6} key={idx}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedGender === gender}
                        onChange={handleRadioChange}
                        value={gender}
                        name="gender"
                      />
                    }
                    label={gender}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <button
                type="button"
                onClick={() => {
                  setUserInfo({ ...userInfo, gender: selectedGender });
                  nextPage();
                }}
                className="btn-hover color"
                disabled={selectedGender === ""} // 라디오 버튼이 선택되지 않았을 때 비활성화
                style={{ marginTop: 15 }}
              >
                다음
              </button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupGender;
