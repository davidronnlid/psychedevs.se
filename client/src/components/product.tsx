import React, { SyntheticEvent, useEffect } from "react";
import {
  addIdToCart,
  removeIdFromCart,
  selectCartIds,
  selectNumberOfAddedIds,
} from "../redux/cartIdsSlice";
import {
  addPriceToCart,
  removePriceFromCart,
  selectTotalCartPrice,
} from "../redux/cartPricesSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ProductProps } from "../types/ProductProps";

const Product = (props: { product: ProductProps }) => {
  const product = props.product;
  const cartIds = useAppSelector(selectCartIds);
  const numberOfAddedIds = useAppSelector((state) =>
    selectNumberOfAddedIds(state, product.id)
  );
  const dispatch = useAppDispatch();

  const handleAddClick = (e: React.MouseEvent, id: number, price: number) => {
    dispatch({ type: addIdToCart, payload: id });
    dispatch({ type: addPriceToCart, payload: price });
  };
  const handleRemoveClick = (
    e: React.MouseEvent,
    id: number,
    price: number
  ) => {
    dispatch({ type: removeIdFromCart, payload: id });
    dispatch({ type: removePriceFromCart, payload: price });
  };

  return (
    <div className="loaded-product">
      <h1>{product.title}</h1>
      <h3>{product.description}</h3>
      <p>{product.price} kr</p>
      <button
        onClick={(event) => handleAddClick(event, product.id, product.price)}
      >
        Add to cart
      </button>
      {numberOfAddedIds}
      <button
        onClick={(event) => handleRemoveClick(event, product.id, product.price)}
      >
        Remove from cart
      </button>
    </div>
  );
};

export default Product;
