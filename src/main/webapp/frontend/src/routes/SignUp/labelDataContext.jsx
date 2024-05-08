import React, { useState, createContext } from "react";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    SignupId: {
      Id: "",
    },
    SignupPwd: {
      pwd1: "",
      pwd2: "",
    },
    SignupNickname: {
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

  const setSignupIdInfo = (prop) => (event) => {
    setUserInfo({
      ...userInfo,
      SignupId: { ...userInfo.SignupId, [prop]: event.target.value },
    });
  };
  const setSignupPwdInfo = (prop) => (event) => {
    setUserInfo({
      ...userInfo,
      SignupPwd: { ...userInfo.SignupPwd, [prop]: event.target.value },
    });
  };
  const setSignupNicknameInfo = (prop) => (event) => {
    setUserInfo({
      ...userInfo,
      SignupNickname: {
        ...userInfo.SignupNickname,
        [prop]: event.target.value,
      },
    });
  };
  const steps = [
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
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
      {props.children}
    </LabelContext.Provider>
  );
};
