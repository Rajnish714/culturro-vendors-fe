import React, {useEffect, useCallback} from "react";
import ProductTable from "../components/ProductTable";
import {useProductStore} from "../store/useProductStore";
import {useLogin} from "../hooks/AuthHooks";

const Home: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const {loginState} = useLogin();
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const getProducts = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <h2>Products</h2>
      <div>
        {loginState && (
          <div>
            <p>Welcome, {}</p>
            <p>Email: {}</p>
          </div>
        )}
      </div>
      <ProductTable products={products} />
    </div>
  );
};

export default Home;
