import React, { useState } from 'react';
import '../styles/Calendar.css';

function Calendar({ onSelectRange }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null); // 선택된 시작일 상태
  const [selectedEndDate, setSelectedEndDate] = useState(null); // 선택된 종료일 상태
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 선택된 연도 상태
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 선택된 월 상태

  // 이전 달로 이동하는 함수
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 다음 달로 이동하는 함수
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 날짜 클릭 시 호출되는 함수
  const handleDateClick = (date) => {
    if (!selectedStartDate) {
      // 시작일이 선택되지 않은 경우
      setSelectedStartDate(date); // 선택한 날짜를 시작일로 설정
      setSelectedEndDate(null); // 종료일 초기화
    } else if (!selectedEndDate) {
      // 종료일이 선택되지 않은 경우
      if (date < selectedStartDate) {
        // 선택한 날짜가 시작일보다 이전인 경우
        setSelectedStartDate(date); // 선택한 날짜를 시작일로 재설정
        setSelectedEndDate(null); // 종료일 초기화
      } else {
        // 선택한 날짜가 시작일 이후인 경우
        setSelectedEndDate(date); // 선택한 날짜를 종료일로 설정
        onSelectRange(selectedStartDate, date); // 선택된 범위를 상위 컴포넌트로 전달
      }
    } else {
      // 시작일과 종료일이 이미 선택된 경우, 날짜를 재선택하여 시작일로 설정
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  // 선택된 월의 달력 UI 생성 함수
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // 선택된 월의 첫째 날
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // 선택된 월의 마지막 날

    const weeks = [];
    let week = [];
    let currentDate = new Date(firstDayOfMonth);

    // 이번 달의 첫째 날이 속한 주의 시작 요일까지는 빈 칸으로 채웁니다.
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      week.push(null);
    }

    while (currentDate <= lastDayOfMonth) {
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 마지막 주가 7일이 아닐 경우, 마지막 주의 나머지 칸을 빈 칸으로 채웁니다.
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);

    // 각 날짜를 UI로 생성합니다.
    return weeks.map((week, weekIndex) => (
      <div className="week" key={weekIndex}>
        {week.map((date, dateIndex) => (
          <div
            key={dateIndex}
            className={`day ${date ? '' : 'empty'} 
            ${date && date >= firstDayOfMonth && date <= lastDayOfMonth ? 'current-month' : 'other-month'} 
            ${date && date.getTime() === selectedStartDate?.getTime() ? 'start-date' : ''} 
            ${date && date.getTime() === selectedEndDate?.getTime() ? 'end-date' : ''} 
            ${date && date > selectedStartDate && date < selectedEndDate ? 'in-range' : ''}`}
            onClick={() => date && handleDateClick(date)}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="calendar">
      {/* 월 이동 버튼 */}
      <div className="month-navigation">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      
      {/* 선택된 월의 달력 UI를 렌더링합니다. */}
      {renderCalendar()}
    </div>
  );
}

export default Calendar;
