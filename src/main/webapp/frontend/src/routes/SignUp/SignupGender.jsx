import React, { useContext, useState } from "react";
import { LabelContext } from "./labelDataContext";
import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup_styles.css";

const SignupGender = () => {
  const { userInfo, setUserInfo, nextPage, prevPage } =
    useContext(LabelContext);
  const [checkedList, setCheckedList] = useState(userInfo.gender || []);

  const checkHandler = (event) => {
    const item = event.target.name;
    const isChecked = event.target.checked;
    setCheckedList((prev) =>
      isChecked ? [...prev, item] : prev.filter((x) => x !== item),
    );
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12}>
          <form>
            <FormGroup row>
              {["남성", "여성"].map((gender, idx) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedList.includes(gender)}
                      onChange={checkHandler}
                      name={gender}
                    />
                  }
                  label={gender}
                  key={idx}
                />
              ))}
            </FormGroup>
            <Button
              type="button"
              onClick={() => {
                setUserInfo({ ...userInfo, gender: checkedList });
                nextPage();
              }}
              className="btn-hover color"
              style={{ marginTop: 15 }}
            >
              다음
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupGender;
