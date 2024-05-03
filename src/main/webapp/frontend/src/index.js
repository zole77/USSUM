import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { LabelProvider } from "./routes/Join/labelDataContext";

// createRoot를 사용하여 루트를 생성합니다.
const root = createRoot(document.getElementById("root"));

// root.render를 호출하여 앱을 렌더링합니다.
root.render(
  <StrictMode>
    <LabelProvider>
      <App />
    </LabelProvider>
  </StrictMode>,
);
