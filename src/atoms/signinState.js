import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
  email: "",
  nickname: "",
  social: false,
  accessToken: "",
  refreshToken: "",
};

// cookie에서 로딩
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  // nickname
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
};

export const signinState = atom({
  key: "signinState", // unique ID (with respect to other atoms/selectors)
  default: loadMemberCookie() || initState,
});
