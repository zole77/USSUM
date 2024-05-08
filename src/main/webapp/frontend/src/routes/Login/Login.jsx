import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login_styles.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h4>US:SUM</h4>
        <form>
          <div className="text_area">
            <input
              type="text"
              name="username"
              placeholder="아이디(이메일)을 입력해주세요"
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              className="text_input"
            />
          </div>
          <button type="submit" className="btn-hover color">
            로그인
          </button>
        </form>

        <div className="join-link">
          <button
            onClick={() => (window.location.href = "/Join")}
            className="transparent-btn"
          >
            회원 가입
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
