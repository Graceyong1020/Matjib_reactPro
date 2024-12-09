import { useState, useEffect } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import PageComponent from "../common/PageComponent";
import { API_SERVER_HOST } from "../../api/todoApi";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { moveToList, moveToRead, page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        console.log(data); // 서버 응답 데이터를 콘솔에 출력
        setServerData(data);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFetching(false);
      });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((product) => {
          const imageUrl =
            product.uploadFileNames.length > 0
              ? `${host}/api/products/view/s_${product.uploadFileNames[0]}`
              : `${host}/images/default-thumbnail.jpg`;
          console.log("Image URL:", imageUrl); // 이미지 URL을 콘솔에 출력

          return (
            <div
              key={product.pno}
              className="w-1/2 p-1 rounded shadow-md border-2"
              onClick={() => moveToRead(product.pno)} //moveToRead로 이동
            >
              {/*   Thumbnail 이미지 만들어서 보여줌 */}
              <div className="flex flex-col  h-full">
                <div className="font-extrabold text-2xl p-2 w-full ">
                  {product.pno}
                </div>
                <div className="text-1xl m-1 p-2 w-full flex flex-col">
                  <div className="w-full overflow-hidden ">
                    <img
                      alt="product"
                      className="m-auto rounded-md w-60"
                      src={imageUrl}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${host}/images/default-thumbnail.jpg`;
                      }}
                    />
                  </div>

                  <div className="bottom-0 font-extrabold bg-white">
                    <div className="text-center p-1">
                      Matjib: {product.pname}
                    </div>
                    <div className="text-center p-1">
                      Price: {product.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
