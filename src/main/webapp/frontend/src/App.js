import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layout/Main";
import Join from "./routes/Join/Join";
import Login from "./routes/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
