import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 라이브러리 임포트
import "../../styles/Login_styles.css";

const Login = () => {
  // 상태를 백엔드 변수명에 맞춰서 초기화
  const [userInfo, setUserInfo] = useState({ mem_id: "", mem_password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
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
        localStorage.setItem("token", response.data.token); // 토큰 저장
        navigate("/main");
      } else {
        alert(response.data.message || "로그인 실패했습니다."); // 서버 응답 메시지 사용
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      alert("로그인 중 문제가 발생했습니다.");
    }
  };

  const isInvalid =
    userInfo.mem_id.includes("@") &&
    userInfo.mem_id.includes(".") &&
    userInfo.mem_password.length >= 8;

  return (
    <div className="login">
      <div className="userFrame">
        <h4>US:SUM</h4>
        <form onSubmit={handleSubmit}>
          <div className="text_area">
            <input
              className="userInput"
              type="email" // 입력 필드를 email 유형으로 설정
              placeholder="이메일"
              value={userInfo.mem_id}
              name="mem_id"
              onChange={handleInputChange}
              required
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
              required
              minLength={8} // 최소 길이 유효성 검사
            />
          </div>
          <button
            className="btn-hover color"
            disabled={!isInvalid}
            type="submit" // 버튼을 submit 유형으로 설정
          >
            로그인
          </button>
          <Link to="/Signup" className="link">
            회원 가입
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
