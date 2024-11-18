// import React, { useEffect, useState } from 'react';
// import { fetchProducts } from '../hooks/request';
// import ProductTable from '../components/ProductTable';

// const Home: React.FC = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       const productsData = await fetchProducts();
//       setProducts(productsData);
//     };

//     getProducts();
//   }, []);



//   return (
//     <div>
//       <h2>Products</h2>
         
//       <ProductTable products={products} />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useCallback } from 'react';
import ProductTable from '../components/ProductTable';
import { useProductStore } from '../store/useProductStore';
//import { Product } from '../types'; // Centralized type definition

const Home: React.FC = () => {
  const products = useProductStore((state) => state.products);
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
      <ProductTable products={products} />
    </div>
  );
};

export default Home;
