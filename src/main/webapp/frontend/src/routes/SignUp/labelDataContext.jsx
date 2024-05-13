import React, { useState, createContext, useMemo } from "react";
import SignupGender from "./SignupGender";

export const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    SignupId: { Id: "" },
    SignupPwd: { pwd1: "", pwd2: "" },
    SignupNickname: { nickname: "" },
    SignupGender: "",
    type: "",
  });

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const setSignupIdInfo = (prop) => (event) => {
    setUserInfo((prev) => ({
      ...prev,
      SignupId: { ...prev.SignupId, [prop]: event.target.value },
    }));
  };

  const setSignupPwdInfo = (prop) => (event) => {
    setUserInfo((prev) => ({
      ...prev,
      SignupPwd: { ...prev.SignupPwd, [prop]: event.target.value },
    }));
  };

  const setSignupNicknameInfo = (prop) => (event) => {
    setUserInfo((prev) => ({
      ...prev,
      SignupNickname: { ...prev.SignupNickname, [prop]: event.target.value },
    }));
  };

  const steps = [
    { title: "ID" },
    { title: "비밀번호" },
    { title: "닉네임" },
    { title: "성별" },
    { title: "여행 유형" },
    { title: "확인" },
  ];

  // useMemo를 사용하여 value 객체 메모이제이션
  const value = useMemo(
    () => ({
      page,
      steps,
      nextPage,
      prevPage,
      userInfo,
      handleChange,
      setSignupIdInfo,
      setSignupPwdInfo,
      setSignupNicknameInfo,
    }),
    [page, userInfo],
  );

  return (
    <LabelContext.Provider value={value}>{children}</LabelContext.Provider>
  );
};
