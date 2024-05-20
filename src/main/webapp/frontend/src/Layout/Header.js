import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";
import ChatIcon from "../img/Chat.png";
import AlaramIcon from "../img/Alarm.png";
import WriteModal from "../components/WriteModal";
import logo from "../img/logo.png";
import userIcon from "../img/userIcon.png";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginState = useSelector((state) => state.loginSlice);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleWriteModalToggle = () => {
    setWriteModalOpen(!writeModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
          <Link to="/board" className="nav-link">
            여행 커뮤니티
          </Link>
        </li>
        <li>
          <Link to="/services" className="nav-link">
            같이 가요!
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
        {loginState.email && (
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
      {writeModalOpen && <WriteModal onClose={handleWriteModalToggle} />}
    </nav>
  );
}

export default Header;
