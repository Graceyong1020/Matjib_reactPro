import BasicLayout from "../layouts/BasicLayout";
import React from "react";
import MATJIBGO from "../assets/MATJIBGO.png";

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={MATJIBGO} alt="matjiblogo" className="w-60 h-60" />
        <div className=" text-3xl">Main Page</div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
