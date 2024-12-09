import React from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

function ReadPage(props) {
  const { pno } = useParams();

  return (
    <div className="p-4 w-full bg-white mt-6">
      <div className="text-3xl font-extrabold">Matjib Read Page Component</div>

      <ReadComponent pno={pno}></ReadComponent>
    </div>
  );
}
export default ReadPage;
