import React, { SyntheticEvent, useEffect } from "react";
import {
  addIdToCart,
  removeIdFromCart,
  selectNumberOfAddedIds,
} from "../redux/cartIdsSlice";
import { addPriceToCart, removePriceFromCart } from "../redux/cartPricesSlice";
import { addTitleToCart } from "../redux/cartTitlesSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ProductProps } from "../types/ProductProps";

import styles from "../css-modules/product.module.css";
import StripeCheckout from "./stripeCheckout";
import { Button } from "@mui/material";

import juhaniMockupEBok from "../images/juhani_mockup_e-bok.png";

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
    numberOfAddedIds
      ? null
      : dispatch({ type: addIdToCart, payload: id }) &&
        dispatch({ type: addTitleToCart, payload: title }) &&
        dispatch({ type: addPriceToCart, payload: price });
  };
  const handleRemoveClick = (
    e: React.MouseEvent,
    id: number,
    price: number,
    title: string
  ) => {
    numberOfAddedIds
      ? dispatch({ type: removeIdFromCart, payload: id }) &&
        dispatch({ type: addTitleToCart, payload: title }) &&
        dispatch({ type: removePriceFromCart, payload: price })
      : null;
  };

  return (
    <div>
      <h1 className={styles.title}>{product.title}</h1>
      {product.title === "PsycheDevs E-bok" ? (
        <img
          src={juhaniMockupEBok}
          alt="PsycheDevs E-bok omslag"
          style={{ width: "40vw" }}
        />
      ) : null}{" "}
      <h3 className={styles.title}>{product.description}</h3>
      <p className={styles.title}>{product.price} kr</p>
      <Button
        variant="contained"
        color="primary"
        onClick={(event) =>
          handleAddClick(event, product.id, product.price, product.title)
        }
        className={styles.title}
      >
        +
      </Button>
      <p className={styles.title}>{numberOfAddedIds}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={(event) =>
          handleRemoveClick(event, product.id, product.price, product.title)
        }
        className={styles.title}
      >
        -
      </Button>
      {product.title === "PsycheDevs E-bok" ? (
        <StripeCheckout btnText="Köp direkt" />
      ) : null}
    </div>
  );
};

export default Product;
