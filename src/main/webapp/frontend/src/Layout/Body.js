import React from "react";
import { Routes, Route } from "react-router-dom";
import ServiceIntro from "../routes/ServiceIntro";
import Board from "../routes/Board";
import Main from "../routes/Main";
import Login from "../routes/Login/Login";
import SignUp from "../routes/SignUp/SignUp";
import ModMember from "../routes/MyPage/ModMember";
import Chat from "../routes/Chat/Chat";
import Withme from "../routes/Withme/Withme";

function Body() {
    return (
        <div>
            <Routes>
                <Route path="/info" element={<ServiceIntro />} />
                <Route path="/board" element={<Board />} />
                <Route path="/Withme" element={<Withme />} />
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<ModMember />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </div>
    );
}

export default Body;
