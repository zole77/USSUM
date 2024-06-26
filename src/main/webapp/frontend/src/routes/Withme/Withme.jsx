import React, { useEffect, useState } from "react";
import WithMePost from "./WithMePost";
import { Link } from "react-router-dom";
import WriteModal from "./WriteModal"; // WriteModal 컴포넌트 import
import ReadModal from "./ReadModal";
import "../../styles/Withme.css";
import "../../styles/WithmePost.css";
import axios from "axios";
import KakaoMap from "./KakaoMap";
import gamcheon from "../../img/gamcheon.jpg";
import gwang from "../../img/gwang.jpg";
import haewoondae from "../../img/haewoondae.jpg";
import taejong from "../../img/taejong.jpg";

function Withme() {
    const [selectedModal, setSelectedModal] = useState(null);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // WriteModal 열림 상태를 관리하는 상태
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 광역시 상태를 관리하는 상태
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [withMePost, setWithMePost] = useState();
    const [clickedCoords, setClickedCoords] = useState(null);
    const [readModalOpen, setReadModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(false);
    const [postUser, setPostUser] = useState(null);
    const [postThumbnail, setPostThumbnail] = useState();
    const [withMe_x, setWithMe_x] = useState();
    const [withMe_y, setWithMe_y] = useState();

    const fetchWithMePost = async () => {
        try {
            const response = await axios.get("withme/getall");
            setWithMePost(response.data.slice().sort((a, b) => b.withMe_id - a.withMe_id));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchWithMePost();
    }, []);

    const dropdownOptions = {
        서울특별시: ["종로구", "용산구", "성동구", "강북구", "서대문구", "마포구"],
        부산광역시: ["해운대구", "사하구", "수정구", "사상구", "금정구", "남구"],
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
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        setSelectedDistrict(""); // 시 변경될 때 구 초기화
    };

    const handleDistrictSelect = (event) => {
        const selectedDistrict = event.target.value;
        setSelectedDistrict(selectedDistrict);
    };
    const handleMapClick = (coords) => {
        setClickedCoords(coords);
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
                        <select onChange={handleDistrictSelect} disabled={!selectedCity}>
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
                <div className="withme-modal-container">
                    {withMePost.map((post) => (
                        <div className="modal-wrapper" key={post.withMe_id}>
                            <WithMePost
                                post={post}
                                setSelectedPost={setSelectedPost}
                                setReadModalOpen={setReadModalOpen}
                                setPostUser={setPostUser}
                                setPostThumbnail={setPostThumbnail}
                            />
                        </div>
                    ))}
                </div>
            </section>
            {readModalOpen && selectedPost && (
                <ReadModal
                    selectedPost={selectedPost}
                    postThumbnail={postThumbnail}
                    setReadModalOpen={setReadModalOpen}
                    postUser={postUser}
                />
            )}

            <div className="divider"></div>
            {Array.isArray(withMePost) && withMePost.length > 0 && (
                <section className="right-section">
                    <div className="location-text">
                        같이 갈 위치 : {selectedCity} {selectedDistrict}
                    </div>
                    <div className="map-container">
                        <KakaoMap
                            withMePost={withMePost}
                            selectedCity={selectedCity}
                            selectedDistrict={selectedDistrict}
                            onMapClick={handleMapClick}
                            setWithMe_x={setWithMe_x}
                            setWithMe_y={setWithMe_y}
                            setReadModalOpen={setReadModalOpen}
                            setSelectedPost={setSelectedPost}
                            setPostUser={setPostUser}
                            setPostThumbnail={setPostThumbnail}
                        />
                    </div>
                    <div className="writeBtn-container">
                        <button
                            className="write-button"
                            onClick={handleButtonClick}
                            disabled={!clickedCoords}
                        >
                            여기, 같이 가요!
                        </button>
                    </div>
                    <div className="withme-location-text">같이 갈만한 명소!</div>
                    <div>
                        <div className="withme-location-container">
                            <div className="modal-wrapper">
                                <div className="withme-location-post">
                                    <div className="withme-post-thumbnail">
                                        <img src={haewoondae} alt="해운대"></img>
                                    </div>
                                    <div className="withme-postinfo">
                                        <div className="withme-post-title">해운대</div>
                                        <div className="withme-post-joininfo">
                                            <div className="withme-post-gender">
                                                부산하면 가장 먼저 떠오르는 것, 바다! 그중에서도
                                                부산 바다의 정석
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-wrapper">
                                <div className="withme-location-post">
                                    <div className="withme-post-thumbnail">
                                        <img src={gwang} alt="광안리"></img>
                                    </div>
                                    <div className="withme-postinfo">
                                        <div className="withme-post-title">광안리</div>
                                        <div className="withme-post-joininfo">
                                            <div className="withme-post-gender">
                                                광안대교라는 랜드마크와 함께 부산을 대표하는
                                                해수욕장 중 하나
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-wrapper">
                                <div className="withme-location-post">
                                    <div className="withme-post-thumbnail">
                                        <img src={gamcheon} alt="감천문화마을"></img>
                                    </div>
                                    <div className="withme-postinfo">
                                        <div className="withme-post-title">감천문화마을</div>
                                        <div className="withme-post-joininfo">
                                            <div className="withme-post-gender">
                                                하늘에 금방이라도 닿을 것만 같은 형형색색의 지붕,
                                                마을 전체를 덮고 있는 따뜻한 분위기. 질서정연하게
                                                늘어선 계단식 마을이 독특한 아름다움
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-wrapper">
                                <div className="withme-location-post">
                                    <div className="withme-post-thumbnail">
                                        <img src={taejong} alt="태종대"></img>
                                    </div>
                                    <div className="withme-postinfo">
                                        <div className="withme-post-title">태종대</div>
                                        <div className="withme-post-joininfo">
                                            <div className="withme-post-gender">
                                                초록으로 우거진 싱그러운 숲길을 거닐며 푸른 바다를
                                                한눈에 바라볼 수 있는 곳
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* WriteModal이 열려있는 경우에만 렌더링 */}
            {isWriteModalOpen && (
                <WriteModal
                    onClose={handleCloseWriteModal}
                    fetchWithMePost={fetchWithMePost}
                    withMe_x={withMe_x}
                    withMe_y={withMe_y}
                />
            )}
        </div>
    );
}

export default Withme;
