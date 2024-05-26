import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import '../../styles/WriteModal.css';
import axios from 'axios';

function WriteModal({ onClose }) {
  const [step, setStep] = useState(1); // 현재 스텝을 관리하는 상태
  const [formData, setFormData] = useState({}); // 각 스텝에서 수집된 정보를 관리하는 상태

  // 다음 스텝으로 이동하는 함수
  const nextStep = (data) => {
    // 이전 데이터와 새로운 데이터 병합
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    // 데이터 확인
    console.log("데이터 취합 확인:", updatedFormData);
    // 스텝 증가
    setStep(step + 1);
  };

  const sendDataToBackend = async () => {
    const data = {
      withMe_pnum: formData.withMe_pnum,
      mem_id: formData.mem_id,
      withMe_x: formData.withMe_x,
      withMe_y: formData.withMe_y,
      withMe_gender: formData.withMe_gender,
      withMe_sdate: formData.withMe_sdate,
      withMe_edate: formData.withMe_edate,
      withMe_title: formData.withMe_title,
      withMe_content: formData.withMe_content
    };

    const formDataToSend = new FormData();
    formDataToSend.append("post", new Blob([JSON.stringify(data)], { type: "application/json" }));

    // 이미지가 선택된 경우에만 formDataToSend에 추가
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post('/withme/new', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = response.data;
      console.log("Backend response:", result);

      // 전송 후 모달 닫기
      onClose();
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // 각 스텝에 따라 다른 화면을 렌더링
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={(startDate, endDate) => nextStep({ withMe_sdate: startDate, withMe_edate: endDate })} />;
      case 2:
        return <Step2 onNext={(selectedPeople) => nextStep({ withMe_pnum: selectedPeople })} />;
      case 3:
        return <Step3 onNext={(selectedGender) => nextStep({ withMe_gender: selectedGender })} />;
      case 4:
        return <Step4 onSubmit={(title, content) => sendDataToBackend({ withMe_title: title, withMe_content: content })} />;
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
