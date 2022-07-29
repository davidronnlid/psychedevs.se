import React, { useEffect } from "react";
import { removeAllIdsFromCart, selectCartIds } from "../redux/cartIdsSlice";
import {
  removeAllPricesFromCart,
  selectTotalCartPrice,
} from "../redux/cartPricesSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface SuccessfulPaymentProps {
  payerEmail: string;
  orderId: number;
}

const SuccessfulPayment = ({
  payerEmail,
  orderId,
}: SuccessfulPaymentProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const totalCartPrice = useAppSelector(selectTotalCartPrice);

  console.log(totalCartPrice);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payerEmail: payerEmail,
      orderId: orderId,
      totalCartPrice: totalCartPrice,
    }),
  };

  useEffect(() => {
    fetch("/payers-api", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const emptyCart = () =>
    dispatch({ type: removeAllIdsFromCart }) &&
    dispatch({ type: removeAllPricesFromCart });

  useEffect(() => {
    emptyCart();
  }, [emptyCart]);
  return (
    <>
      <h1>Successful Payment!</h1>
      {payerEmail}
    </>
  );
};

export default SuccessfulPayment;
