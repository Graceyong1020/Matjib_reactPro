import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const { moveToPath } = useCustomLogin();
  const dispatch = useDispatch();

  const authCode = searchParams.get("code");

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);

      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("-------------------");
        console.log(memberInfo); // JSON 데이터 확인

        dispatch(login(memberInfo)); //로그인 처리

        //소셜 회원이 아니라면
        if (memberInfo && memberInfo.social) {
          moveToPath("/member/modify");
        } else {
          moveToPath("/");
        }
      });
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
