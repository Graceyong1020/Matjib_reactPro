import React, { useState, useRef } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef(); // 파일 업로드를 위한 ref

  const { moveToList } = useCustomMove();

  const addMutation = useMutation({
    mutationFn: (product) => postAdd(product),
  });

  const handleChangeProduct = (e) => {
    // 상품 정보 변경
    product[e.target.name] = e.target.value;
    setProduct({
      ...product,
    });
  };

  const handleClickAdd = async (e) => {
    console.log(product);

    const formData = new FormData();
    const files = uploadRef.current.files; // 파일 몇개인지 확인

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // 브라우저로 전송될때 files라는 이름으로 전송
    }

    // 다른 데이터들도 추가
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    console.log(formData);

    addMutation.mutate(formData);
  };

  const queryClient = useQueryClient();

  const closeModal = () => {
    queryClient.invalidateQueries("products/list");
    moveToList({ page: 1 }); // 모달창 닫히면 리스트로 이동
  };

  /*  try {
      setFetching(true);
      const response = await postAdd(formData);
      console.log(response);
      setResult(response.result);
      setFetching(false);
      moveToList();
    } catch (error) {
      console.error("Error adding product:", error);
      setFetching(false);
    }
  }; */

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {addMutation.isPending ? <FetchingModal /> : <></>}{" "}
      {/* pending 상태일때만 FetchingModal을 보여줌 */}
      {addMutation.isSuccess ? (
        <ResultModal
          title={"Product Add Result"}
          content={`${addMutation.data.result} has been added.`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Matjib Name</div>
          <input
            className="w-4/5 p-2 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type={"text"}
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Description</div>
          <textarea
            className="w-4/5 p-2 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Budget</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef} // 여기서 파일 데이터를 가져와서 처리
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
