import React from "react";
import {useNavigate} from "react-router-dom";
import ProductForm from "../components/ProductForm";
import {useProducts} from "../hooks/ProductHooks";
import styled from "styled-components";
import {Product} from "../types";

const Container = styled.div`
  padding: 2rem;
`;

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const {addProduct} = useProducts();

  const handleSubmit = async (productData: Product) => {
    console.log("Submitting product:", productData); // Debugging log
    try {
      await addProduct(productData);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const initialValues: Product = {
    id: "",
    name: "",
    description: "",
    category: "",
    stockQuantity: 0,
    price: 0,
  };

  return (
    <Container>
      <h2>Add Product</h2>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddProductPage;

// import React from "react";
// import {useNavigate} from "react-router-dom";
// import ProductForm from "../components/ProductForm";
// import {useProductStore} from "../store/useProductStore";
// import styled from "styled-components";
// import {Product} from "../types";

// const Container = styled.div`
//   padding: 2rem;
// `;

// const AddProductPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (productData: Product) => {
//     try {
//       await addProduct(productData);
//       navigate("/");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   // Define initial values for a new product
//   const initialValues: Product = {
//     id: "", // This will be set by the backend
//     name: "",
//     description: "",
//     category: "",
//     stockQuantity: 0,
//     price: 0,
//   };

//   const {addProduct} = useProductStore();

//   return (
//     <Container>
//       <h2>Add Product</h2>
//       <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
//     </Container>
//   );
// };

// export default AddProductPage;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ProductForm from '../components/ProductForm';
// // import { useProductStore } from '../store/useProductStore';
// // import styled from 'styled-components';
// // import { Product } from '../types';

// // const Container = styled.div`
// //   padding: 2rem;
// // `;

// // const AddProductPage: React.FC = () => {
// //   const {addProduct}=useProductStore()
// //   const navigate = useNavigate();

// //   const handleSubmit = async (productData: any) => {
// //     try {
// //       await addProduct(productData);
// //       navigate('/');
// //     } catch (error) {
// //       console.error('Error adding product:', error);
// //     }
// //   };

// //   return (
// //     <Container>
// //       <h2>Add Product</h2>
// //       <ProductForm onSubmit={handleSubmit} />
// //     </Container>
// //   );
// // };

// // export default AddProductPage;

// // import React from 'react';
// // import ProductForm from '../components/ProductForm';
// // import styled from 'styled-components';

// // const Container = styled.div`
// //   padding: 2rem;
// // `;

// // const AddProductPage: React.FC = () => {
// //   return (
// //     <Container>
// //       <h2>Add Product</h2>
// //       <ProductForm />
// //     </Container>
// //   );
// // };

// // export default AddProductPage;

// // import React from 'react';
// // import styled from 'styled-components';

// // const Container = styled.div`
// //   padding: 2rem;
// // `;

// // const AddProductPage: React.FC = () => {
// //   return (
// //     <Container>
// //       <h2>Add Product</h2>
// //       {/* Include the ProductForm component here */}
// //       <ProductForm />
// //     </Container>
// //   );
// // };

// // const ProductForm: React.FC = () => {
// //   // Implement the form to add a new product
// //   return (
// //     <form>
// //       {/* Form fields go here */}
// //       <div>
// //         <label>Product Name:</label>
// //         <input type="text" name="productName" />
// //       </div>
// //       <div>
// //         <label>Category:</label>
// //         <input type="text" name="category" />
// //       </div>
// //       <div>
// //         <label>Quantity:</label>
// //         <input type="number" name="quantity" />
// //       </div>
// //       <div>
// //         <label>Price:</label>
// //         <input type="number" name="price" />
// //       </div>
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // };

// // export default AddProductPage;
