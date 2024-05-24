import React, { useState } from 'react';
import '../../styles/Step3.css';

function Step3({ user, onNext, onClose }) {
  const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별 상태

  // 다음 단계로 이동하는 함수
  const handleNext = () => {
    if (selectedGender) {
      onNext(selectedGender);
    } else {
      alert('성별을 선택해주세요.');
    }
  };

  return (
    <div className="Step3">
      <h2>{user}님! 매칭을 원하는 성별을 선택해주세요.</h2>
      <div className="radio-container">
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={selectedGender === "male"}
          onChange={() => setSelectedGender("male")}
        />
        <label htmlFor="male">남성</label>

        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={selectedGender === "female"}
          onChange={() => setSelectedGender("female")}
        />
        <label htmlFor="female">여성</label>

        <input
          type="radio"
          id="any"
          name="gender"
          value="any"
          checked={selectedGender === "any"}
          onChange={() => setSelectedGender("any")}
        />
        <label htmlFor="any">상관없음</label>
      </div>
      <div className="button-container">
        <button onClick={handleNext}>다음</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Step3;
