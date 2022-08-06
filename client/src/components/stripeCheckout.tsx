import { selectCartIds } from "../redux/cartIdsSlice";
import { selectTotalCartPrice } from "../redux/cartPricesSlice";
import { useAppSelector } from "../redux/hooks";

const StripeCheckout = () => {
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const cartIds = useAppSelector(selectCartIds);

  const data = { totalCartPrice: totalCartPrice, cartIds: cartIds };

  const handleClick = () => {
    fetch("/new-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log("Success:", data);
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form action="/create-checkout-session" method="POST">
      <button type="submit" onClick={() => handleClick()}>
        Checkout
      </button>
    </form>
  );
};

export default StripeCheckout;
