import React, { useState, createContext } from "react";

export const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    SignupId: { Id: "" },
    SignupPwd: { pwd1: "", pwd2: "" },
    SignupNickname: { nickname: "" },
    type: "",
  });

  // 다음 페이지로 이동
  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // 이전 페이지로 이동
  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  // 전체적인 입력 처리 메소드
  const handleChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  // SignupId 정보 변경
  const setSignupIdInfo = (prop) => (event) => {
    setUserInfo((prev) => ({
      ...prev,
      SignupId: { ...prev.SignupId, [prop]: event.target.value },
    }));
  };

  // SignupPwd 정보 변경
  const setSignupPwdInfo = (prop) => (event) => {
    setUserInfo((prev) => ({
      ...prev,
      SignupPwd: { ...prev.SignupPwd, [prop]: event.target.value },
    }));
  };

  // SignupNickname 정보 변경
  const setSignupNicknameInfo = (prop) => (event) => {
    setUserInfo((prev) => ({
      ...prev,
      SignupNickname: { ...prev.SignupNickname, [prop]: event.target.value },
    }));
  };

  const steps = [
    { title: "ID 입력" },
    { title: "비밀번호 입력" },
    { title: "닉네임 입력" },
    { title: "유형 선택" },
    { title: "확인" },
  ];

  return (
    <LabelContext.Provider
      value={{
        page,
        steps,
        nextPage,
        prevPage,
        userInfo,
        handleChange,
        setSignupIdInfo,
        setSignupPwdInfo,
        setSignupNicknameInfo,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
};
