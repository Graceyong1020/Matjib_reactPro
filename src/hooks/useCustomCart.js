import { postChangeCartAsync, getCartItemsAsync } from "./../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const useCustomCart = () => {
  // 카트에 있는 상품 바로 보여주기
  const cartItems = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();

  const refreshCart = () => {
    // 카트 아이템 가져오기
    dispatch(getCartItemsAsync());
  };

  const changeCart = (param) => {
    // 카트 아이템 변경
    dispatch(postChangeCartAsync(param));
  };

  return { cartItems, refreshCart, changeCart };
};
export default useCustomCart;
