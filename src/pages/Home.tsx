import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../hooks/request';
import ProductTable from '../components/ProductTable';

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    getProducts();
  }, []);



  return (
    <div>
      <h2>Products</h2>
         
      <ProductTable products={products} />
    </div>
  );
};

export default Home;
