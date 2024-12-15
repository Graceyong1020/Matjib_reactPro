import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = "6bc48caafbc0358990d18428309d6002";
const redirect_uri = "http://localhost:3000/member/kakao";

const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

const access_token_url = "https://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () => {
  // 카카오 로그인 링크 생성
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  // 카카오 로그인 후 인증코드로부터 액세스 토큰을 받아오는 함수
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
  // 액세스 토큰으로 멤버 정보를 받아오는 함수
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}` //API 서버로 요청
  );

  return res.data;
};
