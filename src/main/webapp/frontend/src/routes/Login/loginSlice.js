import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    mem_id: "",
    mem_pwd: "",
    mem_gender: "",
    mem_phone: "",
    mem_address: "",
    mem_birth: null,
    mem_type: "",
    mem_nickname: "",
    mem_name: "",
    isLogin: false,
  },
  reducers: {
    // login 성공 시
    loginUser: (state, action) => {
      return { ...state, ...action.payload, isLogin: true };
    },
    // login 실패 시
    clearUser: (state) => {
      return {
        mem_id: "",
        mem_pwd: "",
        mem_gender: "",
        mem_phone: "",
        mem_address: "",
        mem_birth: null,
        mem_type: "",
        mem_nickname: "",
        mem_name: "",
        isLogin: false,
      };
    },
  },
});

export const { loginUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
