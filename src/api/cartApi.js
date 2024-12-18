import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/cart`;

// 장바구니에 담긴 상품 가져오기
export const getCartItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);

  return res.data;
};

// 새로운 상품 추가, 변경
export const postChangeCart = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/change`, cartItem);

  return res.data;
};
