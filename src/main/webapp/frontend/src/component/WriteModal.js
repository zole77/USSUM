import React, { useState } from 'react';
import Step1 from './Step1'; // 스텝1 컴포넌트 import
import './css/WriteModal.css';

function WriteModal({ onClose }) {
  const [step, setStep] = useState(1); // 현재 스텝을 관리하는 상태

  // 다음 스텝으로 이동하는 함수
  const nextStep = () => {
    setStep(step + 1);
  };

  // 각 스텝에 따라 다른 화면을 렌더링
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} onClose={onClose} />;
      case 2:
        // Step2 컴포넌트 구현
        break;
      case 3:
        // Step3 컴포넌트 구현
        break;
      case 4:
        // Step4 컴포넌트 구현
        break;
      default:
        return null;
    }
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* 각 스텝에 따라 다른 화면을 렌더링 */}
        {renderStep()}
      </div>
    </div>
  );
}

export default WriteModal;
