import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
  // 로그인 할 때 쿠키에 저장

  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); // 보관 기간

  return cookies.set(name, value, { expires: expires, path: "/" });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, path = "/") => {
  return cookies.remove(name, { path: path });
};
