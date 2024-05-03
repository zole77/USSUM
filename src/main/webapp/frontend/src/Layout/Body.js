import React, { useState } from 'react';
import Modal from '../component/Modal';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import
import './css/Body.css';

function Body() {
  const [selectedModal, setSelectedModal] = useState(null); // 선택된 모달을 추적하는 상태

  // 모달을 클릭하면 해당 모달의 상세 페이지로 이동하는 함수
  const handleModalClick = (title) => {
    setSelectedModal(title); // 선택된 모달 설정
  };

  return (
    <div className="body">
      <section className="left-section">
        <div className="dropdown-row">
          <div className="dropdown-container">
            <select>
              <option value="option1">부산광역시</option>
              <option value="option2">옵션 2</option>
              <option value="option3">옵션 3</option>
            </select>
          </div>
          <div className="dropdown-container">
            <select>
              <option value="option1">해운대구</option>
              <option value="option2">옵션 2</option>
              <option value="option3">옵션 3</option>
            </select>
          </div>
        </div>
        <div className="modal-container">
          {/* 각 모달 클릭 시 해당 모달의 상세 페이지로 이동 */}
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
            <Link to={`/modal-detail?title=modal4`} onClick={() => handleModalClick("modal5")}>
              <Modal title="리액트" />
            </Link>
          </div>
          <div className="modal-wrapper">
            <Link to={`/modal-detail?title=modal4`} onClick={() => handleModalClick("modal6")}>
              <Modal title="연습중입니다" />
            </Link>
          </div>
          {/* 나머지 모달들도 동일한 방식으로 구현 */}
        </div>
      </section>
      <div className="divider"></div>
      <section className="right-section">
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
      </section>
    </div>
  );
}

export default Body;
