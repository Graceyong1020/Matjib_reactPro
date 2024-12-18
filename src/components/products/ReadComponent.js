import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import { getOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  uploadFileNames: [],
};

const host = API_SERVER_HOST; // 상품  가져오기 위한 host

function ReadComponent({ pno }) {
  const [product, setProduct] = useState({ ...initState });
  const [fetching, setFetching] = useState(true);
  const { moveToList, moveToModify, page, size } = useCustomMove();
  //cart 관련 -현재 사용자 장바구니 아이템들
  const { changeCart, cartItems } = useCustomCart();

  //로그인한 사용자만 장바구니에 담을 수 있도록
  const { loginState } = useCustomLogin();

  const handleClickAddCart = () => {
    let qty = 1;

    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0]; //아이템의 상품 번호를 필터링 해서 가져옴

    if (addedItem) {
      //장바구니에 이미 담긴 상품이라면
      if (
        window.confirm(
          "이미 장바구니에 담긴 상품입니다. 수량을 변경하시겠습니까?"
        )
      ) {
        return;
      }
      qty = addedItem.qty + 1;
    }
    changeCart({ email: loginState.email, qty: qty, pno: pno });
  };

  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pno}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pname}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">BUDGET</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pdesc}
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex  flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imgFile}`}
            /*  onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${host}/images/default-thumbnail.jpg`;
            }} */
          />
        ))}
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-black bg-yellow-300"
          onClick={handleClickAddCart}
        >
          Add Cart
        </button>

        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList({ page, size })}
        >
          List
        </button>
      </div>
    </div>
  );
}

export default ReadComponent;
