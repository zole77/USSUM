import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./routes/Login/loginSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // user reducer만 persist
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // 직렬화 체크를 무시할 액션 타입 추가
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
