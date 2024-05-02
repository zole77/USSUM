import React, { useContext, useState } from "react";
import { LabelContext } from "./labelDataContext";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../../styles/Join_styles.css"

const JoinType = () => {
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
      <h4>회원가입</h4>
      <form>
        <main className="container">
          <Grid container spacing={2}>
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
                  <input
                    type="checkbox"
                    id={item}
                    checked={checkedList.includes(item)}
                    onChange={(e) => checkHandler(item, e.target.checked)}
                  />
                  <label htmlFor={item} className="label">
                    {item}
                  </label>
                </div>
              </Grid>
            ))}
          </Grid>
        </main>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="text primary button group"
          style={{ marginTop: 15 }}
        >
          <Button onClick={() => val.prevPage()} style={{ margin: 25 }}>
            Previous
          </Button>
          <Button
            onClick={() => {
              val.userInfo.travelPreference = checkedList;
              val.nextPage();
            }}
            style={{ margin: 25 }}
          >
            Next
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default JoinType;
