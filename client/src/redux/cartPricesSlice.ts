import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CartPricesState {
  cartPrices: Array<number>;
}

const initialState: CartPricesState = {
  cartPrices: [],
};

export const CartPricesSlice = createSlice({
  name: "cartPrices",
  initialState,
  reducers: {
    addPriceToCart: (state, action: PayloadAction<number>) => {
      state.cartPrices = state.cartPrices.concat(action.payload);
    },
    removePriceFromCart: (state, action: PayloadAction<number>) => {
      if (
        state.cartPrices.length === 0 ||
        !state.cartPrices.includes(action.payload)
      ) {
        return;
      }
      const priceToRemove = state.cartPrices.findIndex(
        (price) => price === action.payload
      );

      state.cartPrices.splice(priceToRemove, 1);
    },
  },
});

export const { addPriceToCart, removePriceFromCart } = CartPricesSlice.actions;

export const getTotalCartPrice = (state: RootState) => {
  return state.cartPrices.cartPrices.reduce(
    (partialSum, price) => partialSum + price,
    0
  );
};

export default CartPricesSlice.reducer;
