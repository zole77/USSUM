import React from "react";
import "../../styles/Step2.css";

function Step2({ onNext, onClose }) {
    // 선택된 인원 수 상태
    const [selectedPeople, setSelectedPeople] = React.useState(null);

    // 다음 단계로 이동하는 함수
    const handleNext = () => {
        if (selectedPeople) {
            onNext(selectedPeople);
        } else {
            alert("인원을 선택해주세요.");
        }
    };

    return (
        <div className="Step2">
            <h2>몇 명이서 가시나요?</h2>
            {/* 1명에서 9명까지의 버튼 */}
            <div className="human-button-container">
                <div className="row">
                    {[...Array(3)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedPeople(index + 1)}
                            className={selectedPeople === index + 1 ? "selected" : ""}
                        >
                            {index + 1}명
                        </button>
                    ))}
                </div>
                <div className="row">
                    {[...Array(3)].map((_, index) => (
                        <button
                            key={index + 3}
                            onClick={() => setSelectedPeople(index + 4)}
                            className={selectedPeople === index + 4 ? "selected" : ""}
                        >
                            {index + 4}명
                        </button>
                    ))}
                </div>
                <div className="row">
                    {[...Array(3)].map((_, index) => (
                        <button
                            key={index + 6}
                            onClick={() => setSelectedPeople(index + 7)}
                            className={selectedPeople === index + 7 ? "selected" : ""}
                        >
                            {index + 7}명
                        </button>
                    ))}
                </div>
                <div className="row">
                    <button
                        onClick={() => setSelectedPeople(10)}
                        className={selectedPeople === 10 ? "selected" : ""}
                    >
                        10명 이상
                    </button>
                </div>
            </div>
            {/* 다음 버튼 및 닫기 버튼 */}
            <div className="button-container">
                <button onClick={onClose}>닫기</button>
                <button onClick={handleNext}>다음</button>
            </div>
        </div>
    );
}

export default Step2;
