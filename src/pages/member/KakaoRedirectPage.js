import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../api/kakaoApi";
import { useEffect } from "react";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      // getAccessToken 함수를 호출하고, 반환된 accessToken을 출력
      console.log(accessToken);
    });
  }, [authCode]);

  return (
    <div>
      <h1>KakaoRedirectPage</h1>
      <h2>authCode: {authCode}</h2>
    </div>
  );
};

export default KakaoRedirectPage;
