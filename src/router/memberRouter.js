import { Suspense, lazy } from "react";

const Login = lazy(() => import("../pages/member/LoginPage"));
const Loading = <div>loading...</div>;

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
