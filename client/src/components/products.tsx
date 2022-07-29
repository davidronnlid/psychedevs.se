import React, { useState, useEffect } from "react";
import { selectTotalCartPrice } from "../redux/cartPricesSlice";
import { useAppSelector } from "../redux/hooks";
import { ProductProps } from "../types/ProductProps";
import PayPalButtonsContainer from "./payPalButtons";
import Product from "./product";

const Products: React.FC = () => {
  const totalCartPrice = useAppSelector(selectTotalCartPrice);

  const [productsData, setProductsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/products-api")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((productsData) => {
        setProductsData(productsData);
        setError(null);
      })

      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <div>Loading data...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className="loaded-products">
        {productsData &&
          productsData.products.map((product: ProductProps) => (
            <Product product={product} key={product.id} />
          ))}
      </div>
      Total cart price: {totalCartPrice ? totalCartPrice : 0}kr
      <PayPalButtonsContainer cartPrice={totalCartPrice} />
    </div>
  );
};

export default Products;
