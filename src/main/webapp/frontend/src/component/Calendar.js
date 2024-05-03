import React, { useState } from 'react';
import '/Users/youngjae/ussum/src/component/css/Calender.css'; // 캘린더 스타일 CSS 파일 import

function Calendar({ onSelectRange }) {
  const [startDate, setStartDate] = useState(null); // 시작일 상태
  const [endDate, setEndDate] = useState(null); // 종료일 상태

  // 날짜 클릭 시 호출되는 함수
  const handleDateClick = (date) => {
    if (!startDate) {
      // 시작일이 선택되지 않은 경우
      setStartDate(date); // 선택한 날짜를 시작일로 설정
    } else if (!endDate) {
      // 종료일이 선택되지 않은 경우
      if (date < startDate) {
        // 선택한 날짜가 시작일보다 이전인 경우
        setStartDate(date); // 선택한 날짜를 시작일로 재설정
        setEndDate(null); // 종료일 초기화
      } else {
        // 선택한 날짜가 시작일 이후인 경우
        setEndDate(date); // 선택한 날짜를 종료일로 설정
        onSelectRange(startDate, date); // 선택된 범위를 상위 컴포넌트로 전달
      }
    } else {
      // 시작일과 종료일이 이미 선택된 경우, 날짜를 재선택하여 시작일로 설정
      setStartDate(date);
      setEndDate(null);
    }
  };

  // 달력 UI 생성 함수
  const renderCalendar = () => {
    // 여기에 달력 UI를 생성하는 코드를 작성합니다.
  };

  return (
    <div className="calendar">
      {/* 달력 UI를 렌더링합니다. */}
      {renderCalendar()}
    </div>
  );
}

export default Calendar;
