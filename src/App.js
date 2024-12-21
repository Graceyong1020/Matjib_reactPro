import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* react 동작할때 react query client도 초기화 */}
      <RouterProvider router={root} />
      <ReactQueryDevtools initialIsOpen={true} /> {/* 디버깅 도구 */}
    </QueryClientProvider>
  );
}

export default App;
