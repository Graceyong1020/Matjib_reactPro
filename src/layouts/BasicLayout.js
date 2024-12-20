import BasicMenu from "../components/menus/BasicMenu";
import React from "react";
import CartComponent from "../components/menus/CartComponent";

const BasicLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />
      <div className="bg-gray-50 my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
        <aside className="bg-yellow-100 text-gray-900 md:w-1/5 lg:w-1/4 px-5 py-5 shadow-md rounded-lg">
          <CartComponent />
        </aside>
        <main className="bg-white md:w-4/5 lg:w-3/4 px-5 py-5 shadow-lg rounded-lg">
          {children}
        </main>
      </div>
    </>
  );
};

export default BasicLayout;
