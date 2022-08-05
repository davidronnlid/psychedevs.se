import React, { useState, useEffect } from "react";
import ProductTabs from "./productTabs";

const Products: React.FC = () => {
  const [productsData, setProductsData] = useState<any>();
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
      {productsData ? <ProductTabs products={productsData.products} /> : null}
      {loading && <div>Loading data...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
    </div>
  );
};

export default Products;
