import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LabelProvider } from "./routes/Join/labelDataContext";

import Join from "./routes/Join/Join";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <LabelProvider>
            <Join />
        </LabelProvider>
    </StrictMode>
);
