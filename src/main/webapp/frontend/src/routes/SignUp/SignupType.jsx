import React, { useContext, useEffect, useState } from "react";
import { LabelContext } from "./labelDataContext";
import Grid from "@mui/material/Grid";
import "../../styles/Signup_styles.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupType = () => {
  const { prevPage, nextPage, userInfo, setUserInfo } =
      useContext(LabelContext);

  // 사용자가 이전에 선택한 travelType을 기반으로 초기 상태를 설정
  const [checkedList, setCheckedList] = useState(userInfo.travelType || []);

  useEffect(() => {
    // userInfo 상태에 현재 checkedList를 저장
    setUserInfo({ ...userInfo, travelType: checkedList });
  }, [checkedList, setUserInfo, userInfo]);

  const checkHandler = (item, isChecked) => {
    setCheckedList((prev) =>
        isChecked ? [...prev, item] : prev.filter((x) => x !== item),
    );
  };

  return (
      <div>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                {/* 빈 공간 */}
              </Grid>
              <Grid item xs={2}>
                <button
                    type="button"
                    className="signup-back-button"
                    onClick={prevPage}
                >
                  <ArrowBackIcon />
                </button>
              </Grid>
              <Grid item xs={4}>
                <h4 className="Signupnickname-heading">회원가입</h4>
              </Grid>

              <Grid item xs={2}>
                {/* 빈 공간 */}
              </Grid>
              <Grid item xs={2}>
                {/* 빈 공간 */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
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
                <Grid item xs={6} sm={3} key={idx}>
                  <label>
                    <input
                        type="checkbox"
                        checked={checkedList.includes(item)}
                        onChange={(e) => checkHandler(item, e.target.checked)}
                    />
                    {item}
                  </label>
                </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: 15, textAlign: "center" }}>
              <button
                  type="button"
                  onClick={nextPage}
                  disabled={checkedList.length === 0}
                  className="btn-hover color"
              >
                다음
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
  );
};

export default SignupType;
