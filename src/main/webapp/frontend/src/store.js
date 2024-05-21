import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./routes/Login/loginSlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
  },
});
