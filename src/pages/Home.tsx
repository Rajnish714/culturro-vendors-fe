import React, {useEffect} from "react";

import ProductTable from "../components/ProductTable";

import {useProducts} from "../hooks/ProductHooks";
import AddProductButton from "../components/AddProductButton";

const Home: React.FC = () => {
  const {fetchProducts, products} = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dash">
      <div className="productheader">
        <h2>Products</h2>
        <AddProductButton />
      </div>

      <div className="producttable">
        <ProductTable products={products} />
      </div>
    </div>
  );
};

export default Home;
