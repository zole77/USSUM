// src/routes/SignUp/SignupType.js
import React, { useContext, useState } from "react";
import { LabelContext } from "./labelDataContext";
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
        <div className="container-wide">
          <div className="grid-container">
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
              <div className="grid-item" key={idx}>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedList.includes(item)}
                      onChange={(e) => checkHandler(item, e.target.checked)}
                      id={item}
                    />
                    {item}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => val.prevPage()}
          style={{ margin: "25px" }}
          className="btn-hover color"
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => {
            val.userInfo.travelType = checkedList;
            val.nextPage();
          }}
          style={{ margin: "25px" }}
          className="btn-hover color"
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default SignupType;
