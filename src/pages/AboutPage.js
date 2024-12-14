import BasicLayout from "../layouts/BasicLayout";
import React from "react";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin(); // 로그인 여부 확인 및 로그인 페이지로 이동
  if (!isLogin) {
    // 로그인하지 않은 경우 로그인 페이지로 이동
    return moveToLoginReturn();
  }

  return (
    <BasicLayout>
      <div className=" text-3xl">About Page</div>
    </BasicLayout>
  );
};

export default AboutPage;
