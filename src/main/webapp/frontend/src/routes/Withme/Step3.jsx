import React, { useState } from "react";
import "../../styles/Step3.css";
import { useSelector } from "react-redux"; // Redux에서 상태 가져오기

function Step3({ user, onNext, onClose }) {
    const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별 상태

    // 다음 단계로 이동하는 함수
    const handleNext = () => {
        if (selectedGender) {
            onNext(selectedGender);
        } else {
            alert("성별을 선택해주세요.");
        }
    };

    // Redux store에서 사용자 정보 가져오기
    const memNickname = useSelector((state) => state.user.mem_nickname);

    return (
        <div className="Step3">
            <h2>
                {memNickname ? `${memNickname}님!` : "User님!"} 님! 매칭을 원하는 성별을
                선택해주세요.
            </h2>
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
                <button onClick={onClose}>닫기</button>
                <button onClick={handleNext}>다음</button>
            </div>
        </div>
    );
}

export default Step3;
