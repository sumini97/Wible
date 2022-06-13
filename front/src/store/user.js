import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userSeq: 0,
  userEmail: "",
  userNickname: "",
  userName: "",
  userPhone: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    save: (state, action) => {
      state.userSeq = action.payload.user_seq;
      state.userEmail = action.payload.email;
      state.userNickname = action.payload.nickname;
      state.userName = action.payload.name;
      state.userPhone = action.payload.phone;
    },
    saveId: (state, action) => {
      console.log(action.payload);
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
    update: (state, action) => {
      state.userNickname = action.payload.nickname;
      state.userPhone = action.payload.phone;
    },
  },
});

export const { save, saveId, update } = userSlice.actions;
export default userSlice.reducer;
