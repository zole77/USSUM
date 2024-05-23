import React, { useState } from 'react';
import Step1 from './Step1'; // 스텝1 컴포넌트 import
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import '../../styles/WriteModal.css';


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
        return <Step1 onNext={nextStep} onClose={onClose} />;
      case 2:
        return <Step2 onNext={nextStep} onClose={onClose} />;
      case 3:
        return <Step3 onNext={nextStep} onClose={onClose} />;
      case 4:
        return <Step4 onNext={nextStep} onClose={onClose} />;
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

