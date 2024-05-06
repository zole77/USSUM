import React from "react";
import ServiceIntro from "../routes/ServiceIntro";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Board from "../routes/Board.js";
import Main from "../routes/Main.js";
import Join from "../routes/Join/Join.jsx";
import Login from "./../routes/Login/Login.jsx";

function Body(props) {
    return (
        <div>
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
}

export default Body;
