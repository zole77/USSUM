import React, { useContext, useState } from "react";
import { LabelContext } from "./labelDataContext";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../../styles/Signup_styles.css";

const SignupType = () => {
  const val = useContext(LabelContext);
  const [checkedList, setCheckedList] = useState([]);

  const checkHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    } else {
      setCheckedList((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <h4 className="Signup-heading">회원가입</h4>
      <form>
        <main className="container-wide">
          <Grid container spacing={1}>
            {[
              "즉흥적",
              "계획적",
              "여럿이서",
              "소수로만",
              "여유롭게",
              "알차게",
              "동성친구만",
              "성별 무관",
              "맛집",
              "감성",
              "액티비티",
              "포토스팟",
            ].map((item, idx) => (
              <Grid item xs={6} sm={2} key={idx}>
                <div className="checkbox">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedList.includes(item)}
                        onChange={(e) => checkHandler(item, e.target.checked)}
                        id={item}
                      />
                    }
                    label={item}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </main>

        <Button
          onClick={() => val.prevPage()}
          style={{ margin: 25 }}
          className="Signup-btn-hover color"
        >
          이전
        </Button>
        <Button
          onClick={() => {
            val.userInfo.travelPreference = checkedList;
            val.nextPage();
          }}
          style={{ margin: 25 }}
          className="btn-hover color"
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SignupType;
