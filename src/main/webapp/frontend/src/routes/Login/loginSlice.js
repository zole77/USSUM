import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    mem_nickname: "",
    mem_id: "",
    mem_gender: "",
    mem_type: "",
    isLoading: false,
    isLogin: false,
  },
  reducers: {
    // login 성공 시
    loginUser: (state, action) => {
      state.mem_nickname = action.payload.mem_nickname;
      state.mem_id = action.payload.mem_id;
      state.mem_gender = action.payload.mem_gender;
      state.mem_type = action.payload.mem_type;
      state.isLoading = false;
      state.isLogin = true;
      return state;
    },
    // login 실패 시
    clearUser: (state) => {
      state.mem_nickname = "";
      state.mem_id = "";
      state.mem_gender = "";
      state.mem_type = "";
      state.isLoading = false;
      state.isLogin = false;
      return state;
    },
  },
});

export const { loginUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
