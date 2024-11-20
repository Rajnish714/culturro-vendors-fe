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
    console.log("Submitting product:", productData);
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
    stockQuantity: 1,
    price: 0,
  };

  return (
    <Container>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddProductPage;
