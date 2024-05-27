import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";
import ChatIcon from "../img/Chat.png";
import AlaramIcon from "../img/Alarm.png";
import logo from "../img/logo.png";
import userIcon from "../img/userIcon.png";
import { clearUser } from "../routes/Login/loginSlice"; // clearUser 액션 가져오기

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // isLoggedIn 상태 추가
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.user); // Redux의 user 상태 사용

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 로그아웃 시 isLoggedIn 상태 업데이트
    alert("로그아웃되었습니다.");
    navigate("/"); // "/"로 리디렉션
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginState]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleUserIconClick = () => {
    navigate("/mypage");
  };

  return (
    <nav className="navigation">
      <div
        className="logo"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleLogoClick();
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="logo" style={{ width: "150px", height: "auto" }} />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/info" className="nav-link">
            서비스 소개
          </Link>
        </li>

        <li>
          <Link to="/Withme" className="nav-link">
            같이 가요!
          </Link>
        </li>
        <li>
          <Link to="/board" className="nav-link">
            US:SUM 커뮤니티
          </Link>
        </li>
      </ul>
      <div className="icons-container">
        <div className="dropdown-toggle" onClick={handleDropdownToggle}>
          <img src={ChatIcon} alt="Dropdown" />
        </div>
        <div className="dropdown-toggle" onClick={handleDropdownToggle}>
          <img src={AlaramIcon} alt="Dropdown" />
        </div>
        {isLoggedIn && (
          <div className="user-icon" onClick={handleUserIconClick}>
            <img
              src={userIcon}
              alt="User Icon"
              style={{ width: "23px", height: "auto", cursor: "pointer" }}
            />
          </div>
        )}

        {/* 로그인/로그아웃 버튼 컨테이너 */}
        <div className="login-button-container">
          {isLoggedIn ? (
            <button className="login-button" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <Link to="/login">
              <button className="login-button">로그인</button>
            </Link>
          )}
        </div>
      </div>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          <li>메뉴 항목 1</li>
          <li>메뉴 항목 2</li>
          <li>메뉴 항목 3</li>
        </ul>
      )}
    </nav>
  );
}

export default Header;
