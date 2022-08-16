import { useEffect, useState } from "react";
import { removeAllIdsFromCart } from "../redux/cartIdsSlice";
import { removeAllTitlesFromCart } from "../redux/cartTitlesSlice";
import {
  removeAllPricesFromCart,
  selectTotalCartPrice,
} from "../redux/cartPricesSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const SuccessfulPayment = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const clearCart = () =>
    dispatch({ type: removeAllIdsFromCart }) &&
    dispatch({ type: removeAllPricesFromCart }) &&
    dispatch({ type: removeAllTitlesFromCart });

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <>
      <h1>Tack för ditt köp!</h1>
      <p>Du har fått ett mejl med mer information om e-boken.</p>
    </>
  );
};

export default SuccessfulPayment;
