import { Link } from "react-router-dom";
import MATJIBGO from "../../assets/MATJIBGO.png";

const BasicMenu = () => {
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
            <li>
              <Link
                to={"/todo"}
                className="text-2xl font-bold hover:text-gray-400 transition duration-300"
              >
                WishList
              </Link>
            </li>
            <li>
              <Link
                to={"/products"}
                className="text-2xl font-bold hover:text-gray-400 transition duration-300"
              >
                Matjib
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={"/login"}
            className="bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-400 transition duration-300"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;
