import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LabelProvider } from "./routes/SignUp/labelDataContext";
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/es/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <BrowserRouter>
                    <LabelProvider>
                        <App />
                    </LabelProvider>
                </BrowserRouter>
            </Provider>
        </PersistGate>
    </React.StrictMode>
);

reportWebVitals();
