// Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";
import ChatIcon from "../img/Chat.png";
import AlaramIcon from "../img/Alarm.png";
import WriteModal from "../components/WriteModal";
import logo from "../img/logo.png";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [writeModalOpen, setWriteModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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

    return (
        <nav className="navigation">
            <div className="logo">
                <img src={logo} alt="logo" style={{ width: "150px", height: "35px" }}></img>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">
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
                <div className="dropdown-toggle" onClick={handleDropdownToggle}>
                    <img src={AlaramIcon} alt="Dropdown" />
                </div>
                <div className="dropdown-toggle" onClick={handleDropdownToggle}>
                    <img src={AlaramIcon} alt="Dropdown" />
                </div>
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
