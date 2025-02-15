import React from "react";
import ListComponent from "../../components/products/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-3xl font-extrabold text-red-400 mb-6">
        My Matjib List 🍷
      </div>
      <ListComponent />
    </div>
  );
};
export default ListPage;
