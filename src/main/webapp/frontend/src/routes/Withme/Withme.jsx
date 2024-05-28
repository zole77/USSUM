import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import WriteModal from "./WriteModal"; // WriteModal 컴포넌트 import
import "../../styles/Withme.css";
import axios from "axios";

function Withme() {
    const [selectedModal, setSelectedModal] = useState(null);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // WriteModal 열림 상태를 관리하는 상태
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 광역시 상태를 관리하는 상태
    const [withMePost, setWithMePost] = useState();

    const fetchWithMePost = async () => {
        try {
            const response = await axios.get("withme/getall");
            console.log(response.data); // 서버로부터 받은 데이터
            setWithMePost(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchWithMePost();
    }, []);

    const dropdownOptions = {
        서울광역시: ["종로구", "용산구", "성동구", "강북구", "서대문구", "마포구"],
        부산광역시: ["해운대구", "사하구", "수정구", "사상구", "금정구"],
        대구광역시: ["수성구", "동구", "서구", "북구", "달서구"],
        인천광역시: ["중구", "동구", "미추홀구", "연수구", "남동구"],
        대전광역시: ["동구", "서구", "중구", "유성구", "대덕구"],
    };

    const handleModalClick = (title) => {
        setSelectedModal(title);
    };

    const handleButtonClick = () => {
        setIsWriteModalOpen(true); // 글쓰기 버튼 클릭 시 WriteModal 열기
    };

    const handleCitySelect = (event) => {
        setSelectedCity(event.target.value);
    };

    // WriteModal을 닫는 함수
    const handleCloseWriteModal = () => {
        setIsWriteModalOpen(false);
    };

    if (!Array.isArray(withMePost) || withMePost.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Withme">
            <section className="left-section">
                <div className="dropdown-row">
                    <div className={`dropdown-container ${selectedCity ? "active" : ""}`}>
                        <select onChange={handleCitySelect}>
                            <option value="">광역시 선택</option>
                            {Object.keys(dropdownOptions).map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`dropdown-container ${selectedCity ? "active" : ""}`}>
                        <select>
                            <option value="">구 선택</option>
                            {selectedCity &&
                                dropdownOptions[selectedCity].map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <h3>당신 근처의 같이가요!</h3>
                {/* currentPosts.map((post) => (
              <div className="list" key={post.id}>
                  <CommuPost
                      boardList={post}
                      setReadModalOpen={setReadModalOpen}
                      setSelectedPost={setSelectedPost}
                  />
              </div>
              )) */}
                <div className="withme-modal-container">
                    {withMePost.map((post) => (
                        <div className="modal-wrapper" key={post.withMe_id}>
                            <Modal post={post} />
                        </div>
                    ))}
                </div>
            </section>
            <div className="divider"></div>
            <section className="right-section">
                <div className="location-text">
                    같이 갈 위치 : 부산 해운대
                    <button className="write-button" onClick={handleButtonClick}>
                        글쓰기
                    </button>
                </div>
                <div className="map-container">
                    {/* 지도 컴포넌트 또는 지도 API 코드 추가 */}
                    <p>여기에 지도가 표시됩니다.</p>
                </div>
            </section>
            {/* WriteModal이 열려있는 경우에만 렌더링 */}
            {isWriteModalOpen && <WriteModal onClose={handleCloseWriteModal} />}
        </div>
    );
}

export default Withme;
