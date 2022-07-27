import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CartIdsState {
  cartIds: Array<number>;
}

const initialState: CartIdsState = {
  cartIds: [],
};

export const CartIdsSlice = createSlice({
  name: "cartIds",
  initialState,
  reducers: {
    addIdToCart: (state, action: PayloadAction<number>) => {
      state.cartIds = state.cartIds.concat(action.payload);
    },
    removeIdFromCart: (state, action: PayloadAction<number>) => {
      if (
        state.cartIds.length === 0 ||
        !state.cartIds.includes(action.payload)
      ) {
        return;
      }
      const idToRemove = state.cartIds.findIndex((id) => id === action.payload);

      state.cartIds.splice(idToRemove, 1);
    },
  },
});

export const { addIdToCart, removeIdFromCart } = CartIdsSlice.actions;

export const selectCartIds = (state: RootState) => state.cartIds.cartIds;

export const selectNumberOfAddedIds = (state: RootState, productId: number) => {
  // productId is passed in as an argument to the selector in the React product component

  // Below we check how many of that product have been selected by the user (how many ids have been added to the cartIds state)
  return state.cartIds.cartIds.filter(
    (idToCountInCartIdsState) => idToCountInCartIdsState === productId
  ).length;
};

export default CartIdsSlice.reducer;
