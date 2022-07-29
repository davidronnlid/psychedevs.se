import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CartTitlesState {
  cartTitles: Array<number>;
}

const initialState: CartTitlesState = {
  cartTitles: [],
};

export const CartTitlesSlice = createSlice({
  name: "cartTitles",
  initialState,
  reducers: {
    addTitleToCart: (state, action: PayloadAction<number>) => {
      state.cartTitles = state.cartTitles.concat(action.payload);
    },

    removeTitleFromCart: (state, action: PayloadAction<number>) => {
      if (
        state.cartTitles.length === 0 ||
        !state.cartTitles.includes(action.payload)
      ) {
        return;
      }
      const titleToRemove = state.cartTitles.findIndex(
        (title) => title === action.payload
      );

      state.cartTitles.splice(titleToRemove, 1);
    },
    removeAllTitlesFromCart: (state) => {
      state.cartTitles = [];
    },
  },
});

export const { addTitleToCart, removeTitleFromCart, removeAllTitlesFromCart } =
  CartTitlesSlice.actions;

export const selectCartTitles = (state: RootState) =>
  state.cartTitles.cartTitles;
export default CartTitlesSlice.reducer;
