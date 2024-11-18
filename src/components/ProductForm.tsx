import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Product } from '../types'; 

// Import Product type

const FormContainer = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
`;

interface ProductFormProps {
  initialValues: Product;
  onSubmit: (productData: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
  const [product, setProduct] = useState(initialValues);

  useEffect(() => {
    setProduct(initialValues);
  }, [initialValues]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  }, [product, onSubmit]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

export default ProductForm;



// import React, { useState, useEffect, useCallback } from 'react';
// import styled from 'styled-components';
// import { Product } from '../types';

// const FormContainer = styled.div`
//   background-color: #f8f9fa;
//   padding: 1rem;
//   border: 1px solid #ddd;
//   margin-bottom: 1rem;
// `;

// // interface ProductFormProps {
// //   initialValues?: {
// //     name: string;
// //     description: string;
// //     category: string;
// //     stockQuantity: number;
// //     price: number;
// //   };
// //   onSubmit: (productData: any) => void;
// // }

// interface ProductFormProps { initialValues: Product; 
//   onSubmit: (productData: Product) => void;
//  }
// const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
//   const [product, setProduct] = useState(initialValues || {
//     name: '',
//     description: '',
//     category: '',
//     stockQuantity: 0,
//     price: 0
//   });

//   useEffect(() => {
//     if (initialValues) {
//       setProduct(initialValues);
//     }
//   }, [initialValues]);

//   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProduct(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   }, []);

//   const handleSubmit = useCallback((e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(product);
//   }, [product, onSubmit]);

//   return (
//     <FormContainer>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Product Name:</label>
//           <input type="text" name="name" value={product.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input type="text" name="description" value={product.description} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input type="text" name="category" value={product.category} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input type="number" name="price" value={product.price} onChange={handleChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </FormContainer>
//   );
// };

// export default ProductForm;





// import React from 'react';
// import styled from 'styled-components';

// const FormContainer = styled.div`
//   background-color: #f8f9fa;
//   padding: 1rem;
//   border: 1px solid #ddd;
//   margin-bottom: 1rem;
// `;

// const ProductForm: React.FC<{ productId?: string }> = ({ productId }) => {
//   return (
//     <FormContainer>
//       <h3>{productId ? 'Edit Product' : 'Add Product'}</h3>
//       <form>
//         {/* Form fields go here */}
//         <div>
//           <label>Product Name:</label>
//           <input type="text" name="productName" defaultValue={productId ? 'Product Name' : ''} />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input type="text" name="category" defaultValue={productId ? 'Category' : ''} />
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input type="number" name="quantity" defaultValue={productId ? 10 : 0} />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input type="number" name="price" defaultValue={productId ? 100 : 0} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </FormContainer>
//   );
// };

// export default ProductForm;
