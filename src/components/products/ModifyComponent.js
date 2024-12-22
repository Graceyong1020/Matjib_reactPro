import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

function ModifyComponent({ pno }) {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(false); //결과 상태
  const { moveToList, moveToRead } = useCustomMove();

  const delMutation = useMutation({ mutationFn: (pno) => deleteOne(pno) });
  const modMutation = useMutation({
    mutationFn: (product) => putOne(pno, product),
  }); // 상품이 수정되면 pno와 product를 넘겨줌

  const uploadRef = useRef(null);

  const query = useQuery({
    queryKey: ["products", pno],
    queryFn: () => getOne(pno), //상품 정보 가져오기
    staleTime: Infinity, //무한대로 캐시 -> 수정 시, 오래 걸릴 수 있음
  });

  useEffect(() => {
    if (query.isSuccess) {
      setProduct(query.data);
    }
  }, [pno, query.data, query.isSuccess]);

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({
      ...product,
    });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    product.uploadFileNames = resultFileNames;
    setProduct({
      ...product,
    });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);

    // 기존 파일 유지 -> 기존 파일명을 formData에 추가
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }

    modMutation.mutate(formData);
  };

  const handleClickDelete = () => {
    delMutation.mutate(pno);
  };

  const QueryClient = useQueryClient();

  //모달창 닫기
  const closeModal = () => {
    QueryClient.invalidateQueries(["products", pno]); //삭제,수정 성공하면 해당 상품 정보 캐시 삭제
    QueryClient.invalidateQueries("products/list"); //삭제,수정 성공하면 상품 리스트 캐시 삭제
    if (delMutation.isSuccess) {
      moveToList();
    }

    if (modMutation.isSuccess) {
      moveToRead(pno);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {query.isFetching || delMutation.isPending || modMutation.isPending ? ( //데이터 가져오는 중이거나 삭제 중이거나 수정 중이면 FetchingModal을 보여줌
        <FetchingModal />
      ) : (
        <></>
      )}

      {delMutation.isSuccess || modMutation.isSuccess ? ( //삭제 성공하면 ResultModal을 보여줌
        <ResultModal
          title={"Product Modify Result"}
          content={"Product has been modified."}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Matjib Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
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
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
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
          <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
          <select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          >
            <option value={false}>Keep</option>
            <option value={true}>Delete</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {product.uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)} //화면 이미지 삭제 -> 데이터만 변경
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>

        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-orange-500"
          onClick={handleClickModify}
        >
          Modify
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>
      </div>
    </div>
  );
}

export default ModifyComponent;
