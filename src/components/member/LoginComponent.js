import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await doLogin(loginParam);
      console.log(data);
      if (data && data.error) {
        alert("이메일과 패스워드를 다시 확인하세요");
      } else if (data) {
        alert("로그인 성공");
        moveToPath("/");
      } else {
        alert("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 rounded-lg shadow-lg bg-white">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          LOGIN
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold text-gray-700">
            Email
          </div>
          <input
            className="w-full p-3 rounded border border-solid border-neutral-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            type="text"
            value={loginParam.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold text-gray-700">
            Password
          </div>
          <input
            className="w-full p-3 rounded border border-solid border-neutral-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="pw"
            type="password"
            value={loginParam.pw}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-400 text-xl text-white hover:bg-blue-800 transition duration-300"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
