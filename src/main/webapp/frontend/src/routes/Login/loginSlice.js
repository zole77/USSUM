// src/routes/Login/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await axios.get('/api/user'); // 실제 사용자 정보를 가져오는 API 엔드포인트로 변경하세요
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    mem_nickname: '',
    mem_id: '',
    mem_phone: '',
    mem_birth: '',
    mem_address: '',
    mem_gender: '',
    isLogin: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.mem_nickname = action.payload.mem_nickname;
      state.mem_id = action.payload.mem_id;
      state.mem_phone = action.payload.mem_phone;
      state.mem_birth = action.payload.mem_birth;
      state.mem_address = action.payload.mem_address;
      state.mem_gender = action.payload.mem_gender;
      state.isLogin = true;
    },
    clearUser: (state) => {
      state.mem_nickname = '';
      state.mem_id = '';
      state.mem_phone = '';
      state.mem_birth = '';
      state.mem_address = '';
      state.mem_gender = '';
      state.isLogin = false;
    },
    logoutUser: (state) => {
      state.mem_nickname = '';
      state.mem_id = '';
      state.mem_phone = '';
      state.mem_birth = '';
      state.mem_address = '';
      state.mem_gender = '';
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchUserData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.mem_nickname = action.payload.mem_nickname;
          state.mem_id = action.payload.mem_id;
          state.mem_phone = action.payload.mem_phone;
          state.mem_birth = action.payload.mem_birth;
          state.mem_address = action.payload.mem_address;
          state.mem_gender = action.payload.mem_gender;
          state.isLogin = true;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
  },
});

export const { loginUser, clearUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
