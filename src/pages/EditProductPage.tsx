
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { Product } from '../types'; // Import Product type
import ProductForm from '../components/ProductForm';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const EditProductPage: React.FC = () => {
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const products = useProductStore((state) => state.products);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null); // Initially null to indicate loading state
  
  useEffect(() => { // Find the product from the existing list 
    const selectedProduct = products.find((p) => p.id === productId);
  if (selectedProduct) { setProduct(selectedProduct);
}
 else { console.error('Product not found in the store'); } }
  ,[productId, products]);
  
  useEffect(() => {
  
   
    
    
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(productId!);
        if (productData) {
          setProduct(productData);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProduct();
    
  }, [productId, fetchProductById ]);

  const handleSubmit = useCallback(async (updatedProduct: Product) => {
    try {
      await updateProduct(productId!, updatedProduct);
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }, [productId, updateProduct, navigate]);

  return (
    <Container>
      <h2>Edit Product</h2>
      {product ? (
        <ProductForm initialValues={product} onSubmit={handleSubmit} />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default EditProductPage;



// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useProductStore } from '../store/useProductStore';
// import { Product } from '../types'; // Import Product type
// import ProductForm from '../components/ProductForm';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 2rem;
// `;

// const EditProductPage: React.FC = () => {
//   const fetchProductById = useProductStore((state) => state.fetchProductById);
//   const updateProduct = useProductStore((state) => state.updateProduct);
//   const { productId } = useParams<{ productId: string, }>();
 
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Product>({
//     id: '',
//     name: '',
//     description: '',
//     category: '',
//     stockQuantity: 0,
//     price: 0
//   });

//   useEffect(() => {
   
//     const getProduct = async () => {
//       try {
//         const productData = await fetchProductById(productId!);
      
        
        
//         if (productData) {
//           setProduct(productData);
//         } else {
//           console.error('Product not found');
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     getProduct();
//   }, [productId, fetchProductById]);

//   const handleSubmit = useCallback(async (updatedProduct: Product) => {
//     try {
//       await updateProduct(productId!, updatedProduct);
//       navigate('/');
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   }, [productId, updateProduct, navigate]);

//   return (
//     <Container>
//       <h2>Edit Product</h2>
//       <ProductForm initialValues={product} onSubmit={handleSubmit} />
//     </Container>
//   );
// };

// export default EditProductPage;





