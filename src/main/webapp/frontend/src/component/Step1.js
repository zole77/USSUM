import React, { useState } from 'react';
import Calendar from './Calendar'; // 캘린더 컴포넌트 import
import '/Users/youngjae/ussum/src/component/css/Step1.css'; // Step1 스타일링을 위한 CSS 파일

function Step1({ onNext, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    if (selectedDate) {
      onNext(selectedDate);
    } else {
      alert('날짜를 선택해주세요.');
    }
  };

  return (
    <div className="Step1">
      <h2>회원아이디 님! 추억을 만들고 싶은 날짜를 선택해주세요.</h2>
      <Calendar className="Step1" onSelect={handleDateSelect} />
      <div className="button-container">
        <button onClick={handleNext}>다음</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Step1;
