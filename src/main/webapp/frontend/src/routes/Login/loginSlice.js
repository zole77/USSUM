import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    mem_nickname: "",
    mem_id: "",
    isLoading: false, // optional
    isLogin: null,
  },
  reducers: {
    // login 성공 시
    loginUser: (state, action) => {
      // mem_nickname, mem_id에 API 값 받아오기
      state.mem_nickname = action.payload.mem_nickname;
      state.mem_id = action.payload.mem_id;
      // state 변화를 알림
      return state;
    },
    // login 실패 시
    clearUser: (state) => {
      // mem_nickname, mem_id 값을 비워줌.
      state.mem_nickname = "";
      state.mem_id = "";
      // state 변화를 알림
      return state;
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
