// 로그인 관련 정보를 처리하는 커스텀 훅

import { useNavigate } from "react-router-dom";

import { Navigate, createSearchParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { signinState } from "../atoms/signinState";
import { removeCookie, setCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";
import { cartState } from "../atoms/cartState";

const useCustomLogin = () => {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useRecoilState(signinState); // login
  const resetState = useResetRecoilState(signinState); // logout

  const resetCartState = useResetRecoilState(cartState); // logout 시 카트 초기화

  const isLogin = loginState.email ? true : false; // 로그인 여부 확인

  const doLogin = async (loginParam) => {
    // 로그인 처리
    const result = await loginPost(loginParam);
    saveAsCookie(result);
    return result; // 로그인 결과 리턴
  };

  // 로그인 쿠키 저장
  const saveAsCookie = (data) => {
    setCookie("member", JSON.stringify(data), 1);
    setLoginState(data);
  };

  const doLogout = () => {
    // 로그아웃 처리
    removeCookie("member");
    resetState();
    resetCartState();
  };

  const exceptionHandle = (ex) => {
    console.log("Exception------------------------");
    console.log(ex);

    const errorMsg = ex.response.data.error;
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("Login is required.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }

    if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      alert("Access Denied. Please check your role.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }
  };

  const moveToPath = (path) => {
    // 경로 이동
    navigate(path, { replace: true });
  };

  const moveToLogin = () => {
    // 로그인 페이지로 이동
    navigate("/member/login", { replace: true });
  };

  const moveToLoginReturn = () => {
    // 로그인 페이지로 이동 후 이전 페이지로 돌아가기
    return <Navigate replace to="/member/login" />;
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
    saveAsCookie, // kakaotalk login 할 수 있게
  };
};

export default useCustomLogin;
