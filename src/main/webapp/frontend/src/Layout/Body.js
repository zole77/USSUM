import React from "react";
import ServiceIntro from "../routes/ServiceIntro";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Board from "../routes/Board.js";
import Main from "../routes/Main.js";

import Login from "./../routes/Login/Login.jsx";
import SignUp from "../routes/SignUp/SignUp";

function Body(props) {
  return (
    <div>
      <Routes>
        <Route path="/info" element={<ServiceIntro />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<div>404에러</div>} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Body;
