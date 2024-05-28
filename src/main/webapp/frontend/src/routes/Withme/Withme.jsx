import React, { useState } from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import WriteModal from './WriteModal'; // WriteModal 컴포넌트 import
import '../../styles/Withme.css';
import Map from './Map';


function Withme() {
  const [selectedModal, setSelectedModal] = useState(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // WriteModal 열림 상태를 관리하는 상태
  const [selectedDropdown, setSelectedDropdown] = useState({}); // 선택된 드롭다운 상태를 관리하는 상태
  const [dropdownOptions, setDropdownOptions] = useState({
    부산광역시: ['해운대구', '사하구', '수정구'], // 부산광역시에 따른 두 번째 드롭다운 옵션들
    대구광역시: ['수성구', '동구', '서구'], // 대구광역시에 따른 두 번째 드롭다운 옵션들
    인천광역시: ['중구', '동구', '미추홀구'], // 인천광역시에 따른 두 번째 드롭다운 옵션들
  });

  const handleModalClick = (title) => {
    setSelectedModal(title);
  };

  const handleButtonClick = () => {
    setIsWriteModalOpen(true); // 글쓰기 버튼 클릭 시 WriteModal 열기
  };

  const handleDropdownSelect = (option, value) => {
    setSelectedDropdown({
      ...selectedDropdown,
      [option]: value,
    });
  };

  // WriteModal을 닫는 함수
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  return (
    <div className="Withme">
      <section className="left-section">
        <div className="dropdown-row">
          <div className={`dropdown-container ${selectedDropdown['부산광역시'] ? 'active' : ''}`}>
            <select onClick={() => handleDropdownSelect('부산광역시', true)}>
              <option value="">부산광역시</option>
              <option value="">대구광역시</option>
              <option value="">인천광역시</option>
            </select>
          </div>
          <div className={`dropdown-container ${selectedDropdown['부산광역시'] ? 'active' : ''}`}>
            <select onClick={() => handleDropdownSelect('부산광역시', false)}>
              {dropdownOptions['부산광역시'].map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <h3>당신 근처의 같이가요!</h3>
        <div className="withme-modal-container">
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal1`} onClick={() => handleModalClick("modal1")}>
              <Modal title="안녕" />
            </Link>
          </div>
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal2`} onClick={() => handleModalClick("modal2")}>
              <Modal title="하세요" />
            </Link>
          </div>
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal3`} onClick={() => handleModalClick("modal3")}>
              <Modal title="영재" />
            </Link>
          </div>
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal4`} onClick={() => handleModalClick("modal4")}>
              <Modal title="입니다" />
            </Link>
          </div>
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal5`} onClick={() => handleModalClick("modal5")}>
              <Modal title="리액트" />
            </Link>
          </div>
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal6`} onClick={() => handleModalClick("modal6")}>
              <Modal title="연습중입니다" />
            </Link>
          </div>
          {/* 나머지 모달들도 동일한 방식으로 구현 */}
        </div>
      </section>
      <div className="divider"></div>
      <section className="right-section">
        <div className="location-text">같이 갈 위치 : 부산 해운대
          <button className="write-button" onClick={handleButtonClick}>글쓰기</button>
        </div>
        <div className="map-container">
          <Map/>
        </div>
      </section>
      {/* WriteModal이 열려있는 경우에만 렌더링 */}
      {isWriteModalOpen && <WriteModal onClose={handleCloseWriteModal} />}
    </div>
  );
}

export default Withme;
