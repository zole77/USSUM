import React, { useState } from 'react';
import Calendar from './Calendar'; // 캘린더 컴포넌트 import
import '../../styles/Step1.css'; // Step1 스타일링을 위한 CSS 파일

function Step1({ onNext, onClose }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleNext = () => {
    if (selectedStartDate && selectedEndDate) {
      onNext(selectedStartDate, selectedEndDate);
    } else {
      alert('날짜를 선택해주세요.');
    }
  };

  return (
    <div className="Step1">
      <h2>User님! 추억을 만들고 싶은 날짜를 선택해주세요.</h2>
      <div className="calendar-container">
        <Calendar onSelectRange={handleDateSelect} />
      </div>
      <div className="button-container">
        <button onClick={handleNext}>다음</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Step1;

