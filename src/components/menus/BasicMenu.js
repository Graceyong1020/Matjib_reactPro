import { Link } from "react-router-dom";
import MATJIBGO from "../../assets/MATJIBGO.png";
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {
  const { loginState } = useCustomLogin();

  return (
    <nav id="navbar" className="bg-purple-300 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={MATJIBGO} alt="matjiblogo" className="w-24 h-24 mr-10" />
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                to={"/"}
                className="text-2xl font-bold hover:text-gray-400 transition duration-300"
              >
                Main
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="text-2xl font-bold hover:text-gray-400 transition duration-300"
              >
                About
              </Link>
            </li>

            {loginState.email ? ( //로그인한 사용자만 출력되는 메뉴
              <>
                <li className="pr-6 text-2xl font-bold">
                  <Link to={"/todo/"}>Tasty-Spot</Link>
                </li>
                <li className="pr-6 text-2xl font-bold">
                  <Link to={"/products/"}>My Matjib List</Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {!loginState.email ? (
            <Link
              to={"/member/login"}
              className="bg-yellow-300 text-black px-4 py-2 rounded-full hover:bg-yellow-200 transition duration-300"
            >
              LOGIN
            </Link>
          ) : (
            <Link
              to={"/member/logout"}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300"
            >
              LOGOUT
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;
