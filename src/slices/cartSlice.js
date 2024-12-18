import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk(`getCartItemsAsync`, () => {
  return getCartItems();
});

export const postChangeCartAsync = createAsyncThunk(
  `postChangeCartAsync`,
  (param) => {
    return postChangeCart(param);
  }
);

const initState = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,

  extraReducers: (builder) => {
    //extraReducers: 비동기 처리
    builder
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        //장바구니에 담긴 상품 가져오기
        console.log("getCartItemsAsync fulfilled");

        return action.payload; // payload가 사용자의 item 정보
      })
      .addCase(postChangeCartAsync.fulfilled, (state, action) => {
        //새로운 상품 추가, 변경
        console.log("postCartItemsAsync fulfilled");

        return action.payload; // 변경된 장바구니 정보
      });
  },
});

export default cartSlice.reducer;
