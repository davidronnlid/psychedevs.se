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
import PayPalButtonsContainer from "./payPalButtons";

import styles from "../css-modules/product.module.css";

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
    <div>
      <h1 className={styles.title}>{product.title}</h1>
      <h3 className={styles.title}>{product.description}</h3>
      <p className={styles.title}>{product.price} kr</p>
      <button
        onClick={(event) =>
          handleAddClick(event, product.id, product.price, product.title)
        }
        className={styles.title}
      >
        Add to cart
      </button>
      <p className={styles.title}>{numberOfAddedIds}</p>
      <button
        onClick={(event) =>
          handleRemoveClick(event, product.id, product.price, product.title)
        }
        className={styles.title}
      >
        Remove from cart
      </button>
      <div className={`${styles.title} ${styles.italicize}`}>
        {product.payment_options.includes("paypal_client") ? (
          <PayPalButtonsContainer product={product} />
        ) : (
          "Currently there are no payment options for this product. Coming soon. For now, email david.ronnlid@gmail.com if you are interested in this package."
        )}
      </div>
    </div>
  );
};

export default Product;
