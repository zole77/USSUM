import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./Layout/Layout";

const App = () => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      // 이전 경로와 현재 경로가 다를 때만 새로고침
      window.location.reload();
      previousPathRef.current = location.pathname;
    }
  }, [location]);

  return <Layout />;
};

export default App;
