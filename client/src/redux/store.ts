import { configureStore } from "@reduxjs/toolkit";
import cartIdsReducer from "./cartIdsSlice";
import cartPricesReducer from "./cartPricesSlice";
import cartTitlesReducer from "./cartTitlesSlice";

const store = configureStore({
  reducer: {
    cartIds: cartIdsReducer,
    cartPrices: cartPricesReducer,
    cartTitles: cartTitlesReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
