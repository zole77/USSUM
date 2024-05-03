import React, { useState, createContext } from "react";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    JoinId: {
      Id: "",
    },
    JoinPwd: {
      pwd1: "",
      pwd2: "",
    },
    JoinNickname: {
      nickname: "",
    },
    type: "",
  });
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleChange = (prop) => (event) => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });
  };

  const setJoinIdInfo = (prop) => (event) => {
    setUserInfo({
      ...userInfo,
      JoinId: { ...userInfo.JoinId, [prop]: event.target.value },
    });
  };
  const setJoinPwdInfo = (prop) => (event) => {
    setUserInfo({
      ...userInfo,
      JoinPwd: { ...userInfo.JoinPwd, [prop]: event.target.value },
    });
  };
  const setJoinNicknameInfo = (prop) => (event) => {
    setUserInfo({
      ...userInfo,
      JoinNickname: { ...userInfo.JoinNickname, [prop]: event.target.value },
    });
  };
  const steps = [
    { title: "아이디를 입력해주세요" },
    { title: "비밀번호를 입력해주세요" },
    { title: "닉네임을 입력해주세요" },
    { title: "여행 취향을 선택해주세요" },
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
        setJoinIdInfo,
        setJoinPwdInfo,
        setJoinNicknameInfo,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
