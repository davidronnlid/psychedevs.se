import React, { SyntheticEvent, useEffect } from "react";
import {
  addIdToCart,
  removeIdFromCart,
  selectNumberOfAddedIds,
} from "../redux/cartIdsSlice";
import {
  addPriceToCart,
  removePriceFromCart,
  selectTotalCartPrice,
} from "../redux/cartPricesSlice";
import { addTitleToCart, removeTitleFromCart } from "../redux/cartTitlesSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ProductProps } from "../types/ProductProps";
import PayPalButtonsContainer from "./payPalButtons";

const Product = (props: { product: ProductProps }) => {
  const product = props.product;
  const numberOfAddedIds = useAppSelector((state) =>
    selectNumberOfAddedIds(state, product.id)
  );
  const dispatch = useAppDispatch();

  const handleAddClick = (
    e: React.MouseEvent,
    id: number,
    price: number,
    title: string
  ) => {
    dispatch({ type: addIdToCart, payload: id });
    dispatch({ type: addTitleToCart, payload: title });
    dispatch({ type: addPriceToCart, payload: price });
  };
  const handleRemoveClick = (
    e: React.MouseEvent,
    id: number,
    price: number,
    title: string
  ) => {
    dispatch({ type: removeIdFromCart, payload: id });
    dispatch({ type: addTitleToCart, payload: title });
    dispatch({ type: removePriceFromCart, payload: price });
  };

  return (
    <div className="loaded-product">
      <h1>{product.title}</h1>
      <h3>{product.description}</h3>
      <p>{product.price} kr</p>
      <button
        onClick={(event) =>
          handleAddClick(event, product.id, product.price, product.title)
        }
      >
        Add to cart
      </button>
      {numberOfAddedIds}
      <button
        onClick={(event) =>
          handleRemoveClick(event, product.id, product.price, product.title)
        }
      >
        Remove from cart
      </button>
      <div>
        {product.payment_options.includes("paypal_client") ? (
          <PayPalButtonsContainer product={product} />
        ) : (
          "currently there are no payment options for this product"
        )}
      </div>
    </div>
  );
};

export default Product;
