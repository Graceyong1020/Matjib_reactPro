import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
  // 로그인 할 때 쿠키에 저장

  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); // 보관 기간

  return cookies.set(name, value, { expires: expires, path: "/" }); // expires: 만료일, path: 경로
};

export const getCookie = (name) => {
  // 쿠키에서 로그인 정보 로딩
  return cookies.get(name);
};

export const removeCookie = (name, path = "/") => {
  // 로그아웃 시 쿠키 삭제
  return cookies.remove(name, { path: path });
};
