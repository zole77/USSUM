import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./routes/Login/Login";
import Main from "./routes/Main";

const App = () => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);
  const user = useSelector((state) => state.user) || {}; // user 상태가 undefined인 경우 빈 객체 사용

  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      // 이전 경로와 현재 경로가 다를 때만 새로고침
      window.location.reload();
      previousPathRef.current = location.pathname;
    }
  }, [location]);

  return <Layout>{user.id ? <Main /> : <Login />}</Layout>;
};

export default App;
