// 로그인 관련 정보를 처리하는 커스텀 훅
import { loginPostAsync } from "./../slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./../slices/loginSlice";
import { Navigate, createSearchParams } from "react-router-dom";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginSlice);

  const exceptionHandle = (ex) => {
    console.log("Exception------------------------");
    console.log(ex);

    const errorMsg = ex.response.data.error;
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }

    if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }
  };

  const isLogin = loginState.email ? true : false; // 로그인 여부 확인

  const doLogin = async (loginParam) => {
    // 로그인 처리
    const action = await dispatch(loginPostAsync(loginParam));
    if (loginPostAsync.fulfilled.match(action)) {
      return action.payload;
    } else {
      throw new Error(action.payload || "Login failed");
    }
  };

  const doLogout = () => {
    // 로그아웃 처리
    dispatch(logout());
    console.log("Logged out:", loginState); // 로그아웃 후 상태 확인
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
  };
};

export default useCustomLogin;