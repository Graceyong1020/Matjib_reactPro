import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;
const ProductsList = lazy(() => import("../pages/products/ListPage")); // list에서 Main으로 이동
const ProductsAdd = lazy(() => import("../pages/products/AddPage")); // add에서 Main으로 이동
const ProductsRead = lazy(() => import("../pages/products/ReadPage")); // read에서 Main으로 이동

const productsRouter = () => {
  return [
    {
      path: "list", // list로 들어오면
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ), // loading 보여주고 ProductsList로 이동
    },
    {
      path: "", // 아무것도 없으면
      element: <Navigate replace to={"/products/list"} />, // products/list로 이동
    },
    {
      path: "add", // add로 들어오면
      element: (
        <Suspense fallback={Loading}>
          <ProductsAdd />
        </Suspense>
      ), //  ProductAdd로 이동
    },
    {
      path: "read/:pno", // read로 들어오면
      element: (
        <Suspense fallback={Loading}>
          <ProductsRead />
        </Suspense>
      ), // ProductsRead로
    },
  ];
};

export default productsRouter;
