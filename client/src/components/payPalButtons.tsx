import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useAppSelector } from "../redux/hooks";
import SuccessfulPayment from "./successfulPayment";
import { selectNumberOfAddedIds } from "../redux/cartIdsSlice";
import { ProductProps } from "../types/ProductProps";

// These values are the props in the UI
const currency = "SEK";

interface ButtonWrapperProps {
  currency: string;
  showSpinner: boolean;
  product: ProductProps;
}

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({
  currency,
  showSpinner,
  product,
}: ButtonWrapperProps) => {
  const numberOfAddedIds = useAppSelector((state) =>
    selectNumberOfAddedIds(state, product.id)
  );

  const amount = numberOfAddedIds * 1000;
  // Davids current hourly rate is 1000 SEK, and numberOfAddedIds for the given product corresponds to the number of hours the user has selected in the UI that they want to purchase

  const [successfulPayment, setSuccessfulPayment] = useState(false);

  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      {successfulPayment ? <SuccessfulPayment /> : null}
      {amount ? amount : null}

      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[amount, currency, { layout: "vertical" }]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount.toString(),
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={function (data, actions: any) {
          return actions.order.capture().then(function (details: any) {
            setSuccessfulPayment(true);
          });
        }}
      />
    </>
  );
};

export default function PayPalButtonsContainer(props: {
  product: ProductProps;
}) {
  const product = props.product;

  return (
    <div
      style={{ maxWidth: "485px", minHeight: "200px", margin: "3rem  auto" }}
    >
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZ2bQOkOlpKmT7dbXsyYGpbS-W5E00RRyB5uP2pSJ8zLvljQVJpQOUjq09IkW18eXlEkib6_kxbuUOT-",
          components: "buttons",
          currency: "SEK",
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
          product={product}
        />
      </PayPalScriptProvider>
    </div>
  );
}
