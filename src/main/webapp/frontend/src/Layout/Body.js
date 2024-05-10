import React from "react";
import ServiceIntro from "../routes/ServiceIntro";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Board from "../routes/Board.js";
import Main from "../routes/Main.js";

import Login from "./../routes/Login/Login.jsx";
import SignUp from "../routes/SignUp/SignUp";

function Body(props) {
<<<<<<< HEAD
    return (
        <div style={{ height: "100vh", minHeight: "100vh", paddingBottom: "20px" }}>
            <Routes>
                <Route path="/info" element={<ServiceIntro />} />
                <Route path="/board" element={<Board />} />
                <Route path="*" element={<div>404에러</div>} />
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
=======
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
>>>>>>> bf978530d0a2717e144bcf4551d37a43b63a1724
}

export default Body;
