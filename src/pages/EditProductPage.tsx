import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../hooks/request';
import ProductForm from '../components/ProductForm';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const EditProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    stockQuantity: 0,
    price: 0
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(productId!);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProduct();
  }, [productId]);

  const handleSubmit = useCallback(async (updatedProduct: any) => {
    try {
      await updateProduct(productId!, updatedProduct);
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }, [productId, navigate]);

  return (
    <Container>
      <h2>Edit Product</h2>
      <ProductForm initialValues={product} onSubmit={handleSubmit} />
    </Container>
  );
};

export default EditProductPage;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ProductForm from '../components/ProductForm';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 2rem;
// `;


// const EditProductPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();

//   return (
//     <Container>
//       <h2>Edit Product</h2>
//       <ProductForm productId={productId} />
//     </Container>
//   );
// };

// export default EditProductPage;



// import React from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';

// const Container = styled.div`
//   padding: 2rem;
// `;

// const EditProductPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();

//   // Fetch the product data using the productId

//   return (
//     <Container>
//       <h2>Edit Product</h2>
//       {/* Include the ProductForm component here with fetched product data */}
//       <ProductForm productId={productId} />
//     </Container>
//   );
// };

// const ProductForm: React.FC<{ productId?: string }> = ({ productId }) => {
//   // Implement the form to edit a product
//   return (
//     <form>
//       {/* Form fields with prefilled data for editing go here */}
//       <div>
//         <label>Product Name:</label>
//         <input type="text" name="productName" defaultValue="Product Name" />
//       </div>
//       <div>
//         <label>Category:</label>
//         <input type="text" name="category" defaultValue="Category" />
//       </div>
//       <div>
//         <label>Quantity:</label>
//         <input type="number" name="quantity" defaultValue={10} />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input type="number" name="price" defaultValue={100} />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default EditProductPage;
