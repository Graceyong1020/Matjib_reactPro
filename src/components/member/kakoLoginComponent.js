import { getKakaoLoginLink } from "../../api/kakaoApi";
import React from "react";

const kakaoLoginComponent = () => {
  // 링크가 있는 버튼
  const link = getKakaoLoginLink();

  return (
    <div className="flex flex-col">
      <div className="text-center text-blue-500">Login with Kakao Account</div>
      <div className="flex justify-center w-full">
        <div className="text-2xl text-center m-6 text-white font-extrabold w-3/4 bg-yellow-500 shadow-sm rounded p-2">
          <a
            href={link}
            className="flex items-center justify-center"
            style={{ backgroundColor: "#FFEB00", color: "#000000" }}
          >
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="Kakao Logo"
              className="w-8 h-8 mr-2"
            />
            <span className="text-xl">KAKAO LOGIN</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default kakaoLoginComponent;
