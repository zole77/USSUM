import React, { useState } from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import '../../styles/Withme.css';

function Withme() {
  const [selectedModal, setSelectedModal] = useState(null);

  const handleModalClick = (title) => {
    setSelectedModal(title);
  };

  return (
    <div className="Withme">
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
        </div>
      </section>
      <div className="divider"></div>
      <section className="right-section">
      </section>
    </div>
  );
}

export default Withme;
