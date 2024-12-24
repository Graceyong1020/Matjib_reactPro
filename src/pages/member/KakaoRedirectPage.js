import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const { moveToPath, saveAsCookie } = useCustomLogin();

  const authCode = searchParams.get("code");

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);

      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("-------------------");
        console.log(memberInfo); // JSON 데이터 확인

        saveAsCookie(memberInfo);

        //소셜 회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          moveToPath("/");
        } else {
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <h1>Kakao Login Redirect Page</h1>
      <h2>authCode: {authCode}</h2>
    </div>
  );
};

export default KakaoRedirectPage;
