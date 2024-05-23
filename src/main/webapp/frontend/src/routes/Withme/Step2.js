import React from 'react';


function Step2({ onNext, onClose }) {
  // 선택된 인원 수 상태
  const [selectedPeople, setSelectedPeople] = React.useState(null);

  // 다음 단계로 이동하는 함수
  const handleNext = () => {
    if (selectedPeople) {
      onNext(selectedPeople);
    } else {
      alert('인원을 선택해주세요.');
    }
  };

  return (
    <div className="Step2">
      <h2>몇 명이서 가시나요?</h2>
      {/* 1명에서 9명까지의 버튼 */}
      <div className="button-container">
        {[...Array(9)].map((_, index) => (
          <button key={index} onClick={() => setSelectedPeople(index + 1)}>
            {index + 1}명
          </button>
        ))}
      </div>
      {/* 10명 이상 버튼 */}
      <div className="button-container">
        <button onClick={() => setSelectedPeople(10)}>10명 이상</button>
      </div>
      {/* 다음 버튼 */}
      <div className="button-container">
        <button onClick={handleNext}>다음</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Step2;

