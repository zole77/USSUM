import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css"; // Navigation 스타일링을 위한 CSS 파일
import ChatIcon from "../img/Chat.png"; // 내장된 이미지 파일 import
import AlaramIcon from "../img/Alarm.png"; // 내장된 이미지 파일 import
import WriteModal from "../components/WriteModal"; // 글쓰기 모달 컴포넌트 import

function Header(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [writeModalOpen, setWriteModalOpen] = useState(false); // 글쓰기 모달 열림 상태를 관리하는 상태

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleWriteModalToggle = () => {
        setWriteModalOpen(!writeModalOpen); // 글쓰기 모달 열림/닫힘 상태를 변경합니다.
    };

    return (
        <nav className="navigation">
            <div className="logo">
                <span>US:SUM</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">
                        서비스 소개
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="nav-link">
                        여행 커뮤니티
                    </Link>
                </li>
                <li>
                    <Link to="/services" className="nav-link">
                        같이 가요!
                    </Link>
                </li>
            </ul>
            {/* 아이콘들과 글쓰기 버튼을 감싸는 컨테이너 */}
            <div className="icons-container">
                {/* 드롭다운 토글 버튼 */}
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
                {/* 글쓰기 버튼 */}
                <div className="write-button" onClick={handleWriteModalToggle}>
                    글쓰기
                </div>
            </div>

            {/* 드롭다운 메뉴 */}
            {dropdownOpen && (
                <ul className="dropdown-menu">
                    <li>메뉴 항목 1</li>
                    <li>메뉴 항목 2</li>
                    <li>메뉴 항목 3</li>
                </ul>
            )}

            {/* 글쓰기 모달 */}
            {writeModalOpen && <WriteModal onClose={handleWriteModalToggle} />}
        </nav>
    );
}

export default Header;
