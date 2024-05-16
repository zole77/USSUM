import React, { useState, createContext, useMemo, useCallback } from "react";

export const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    SignupId: { Id: "" },
    SignupPwd: { pwd1: "", pwd2: "" },
    SignupNickname: { nickname: "" },
    gender: "",
    travelType: [], // 빈 배열로 초기화
  });

  const steps = useMemo(
    () => [
      { title: "ID" },
      { title: "비밀번호" },
      { title: "닉네임" },
      { title: "성별" },
      { title: "여행 유형" },
    ],
    [],
  );

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleChange = useCallback((field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  }, []);

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

  const value = useMemo(
    () => ({
      page,
      steps,
      nextPage,
      prevPage,
      userInfo,
      handleChange,
      setUserInfo,
      setSignupIdInfo,
      setSignupPwdInfo,
      setSignupNicknameInfo,
    }),
    [page, userInfo, nextPage, prevPage, steps, handleChange],
  );

  return (
    <LabelContext.Provider value={value}>{children}</LabelContext.Provider>
  );
};
