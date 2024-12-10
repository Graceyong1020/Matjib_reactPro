import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      //state: 기존, action: 새로운 (parameter)
      console.log("login......................");
      return { email: action.payload.email }; //새로운 state. useselector로 가져올 수 있음
    },

    logout: () => {
      console.log("logout......................");
    },
  },
});

export const { login, logout } = loginSlice.actions; // action creator

export default loginSlice.reducer;
