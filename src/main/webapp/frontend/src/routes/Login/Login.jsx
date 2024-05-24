import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Login_styles.css";
import logo from "../../img/logo.png";
import { loginUser } from "./loginSlice"; // 변경된 slice에서 loginUser 가져오기

const Login = () => {
  const [userInfo, setUserInfo] = useState({ mem_id: "", mem_pwd: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (!userInfo.mem_pwd) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    const body = new URLSearchParams();
    body.append("mem_id", userInfo.mem_id);
    body.append("mem_pwd", userInfo.mem_pwd);

    setLoading(true);
    setMsg("Loading...");

    try {
      const response = await axios.post("/login", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response.data);
      setLoading(false);
      if (response.data.message === "LOGIN SUCCESS") {
        alert("로그인 되었습니다.");
        localStorage.setItem("token", response.data.token);
        const member = response.data.member;
        if (member) {
          dispatch(
              loginUser({
                mem_nickname: member.mem_nickname,
                mem_id: member.mem_id,
                mem_gender: member.mem_gender,
                mem_type: member.mem_type, // mem_type 필드 추가
              }),
          );
        } else {
          console.error("Member data is missing in the response.");
          alert("로그인 중 문제가 발생했습니다.");
        }
        setMsg("");
        navigate("/");
      } else {
        handleErrorResponse(response.data);
      }
    } catch (error) {
      console.error(
          "로그인 중 에러 발생:",
          error.response ? error.response.data : error.message,
      );
      alert("로그인 중 문제가 발생했습니다.");
      setLoading(false);
      setMsg("");
    }
  };

  const handleErrorResponse = (data) => {
    setTimeout(() => setMsg(""), 1500);
    switch (data.code) {
      case 400:
        alert("비어있는 내용입니다.");
        break;
      case 401:
        alert("존재하지 않는 id입니다.");
        break;
      case 402:
        alert("비밀번호가 일치하지 않습니다.");
        break;
      default:
        alert(data.message || "로그인 실패했습니다.");
    }
  };

  return (
      <div className="login">
        <div className="userFrame">
          <h4 className="login_title">
            <img
                src={logo}
                alt="US:SUM"
                style={{ width: "200px", height: "auto" }}
            />
          </h4>
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
                  value={userInfo.mem_pwd}
                  name="mem_pwd"
                  onChange={handleInputChange}
                  minLength={8}
              />
            </div>
            <button className="btn-hover color" type="submit" disabled={loading}>
              로그인
            </button>
            <Link to="/signup" className="link">
              회원 가입
            </Link>
          </form>
          <div className="msg">{msg}</div>
        </div>
      </div>
  );
};

export default Login;