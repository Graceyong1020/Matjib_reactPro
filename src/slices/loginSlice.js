import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param)
);

//처음 가져왔을때 만약 쿠키 있으면 쿠키에서 가져오고 없으면 초기값
const loadMemberCookie = () => {
  //쿠키에서 로그인 정보 로딩

  const memberInfo = getCookie("member");

  //만약 쿠키가 있다면
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState, //쿠키가 없다면 초깃값사용
  reducers: {
    login: (state, action) => {
      console.log("login.....", action);
      console.log(action.payload);
      console.log("----------------");
      //{email, pw로 구성 }

      setCookie("member", JSON.stringify(action.payload), 1); //1일

      return action.payload;
    },
    logout: () => {
      console.log("logout....");

      removeCookie("member");
      return { ...initState }; // 로그아웃
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");

        const payload = action.payload;

        //닉네임 한글 처리
        if (payload.nickname) {
          payload.nickname = encodeURIComponent(payload.nickname);
        }

        //정상적인 로그인시에만 저장
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1); //1일
        }

        return payload;
      })

      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
