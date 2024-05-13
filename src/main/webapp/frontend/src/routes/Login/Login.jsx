// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Login_styles.css";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ mem_id: "", mem_password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInfo.mem_id) {
      alert("이메일을 입력해 주세요.");
      return;
    }
    if (!userInfo.mem_password) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
          "http://localhost:8080/login",
          {
            mem_id: userInfo.mem_id,
            mem_password: userInfo.mem_password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
      );

      if (response.data.message === "LOGIN SUCCESS") {
        alert("로그인 되었습니다.");
        localStorage.setItem("token", response.data.token);
        navigate("/main");
      } else {
        alert(response.data.message || "로그인 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      alert("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
      <div className="login">
        <div className="userFrame">
          <h4 className="login_title">US:SUM</h4>
          <form onSubmit={handleSubmit}>
            <div className="text_area">
              <input
                  className="userInput"
                  type="email"
                  placeholder="이메일"
                  value={userInfo.mem_id}
                  name="mem_id"
                  onChange={handleInputChange}
              />
            </div>
            <div className="text_area">
              <input
                  className="userInput"
                  type="password"
                  placeholder="비밀번호"
                  value={userInfo.mem_password}
                  name="mem_password"
                  onChange={handleInputChange}
                  minLength={8}
              />
            </div>
            <button className="btn-hover color" type="submit">
              로그인
            </button>
            <Link to="/signup" className="link">
              회원 가입
            </Link>
          </form>
        </div>
      </div>
  );
};

export default Login;
