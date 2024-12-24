import { atom, selector } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: [],
});

// 장바구니 총 가격 처리
export const cartTotalState = selector({
  key: "cartTotalState",
  get: ({ get }) => {
    const arr = get(cartState);

    const initialValue = 0;

    const total = arr.reduce(
      (total, current) => total + current.price * current.qty,
      initialValue
    );

    return total;
  },
});
