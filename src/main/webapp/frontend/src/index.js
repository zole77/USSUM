import React, { StrictMode } from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LabelProvider } from "./routes/SignUp/labelDataContext";

// createRoot를 사용하여 루트를 생성합니다.
const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render를 호출하여 앱을 렌더링합니다.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LabelProvider>
        <App />
      </LabelProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
