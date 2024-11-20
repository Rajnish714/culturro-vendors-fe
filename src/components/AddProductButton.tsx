import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const AddButton = styled.button`
 color: #fff;
  background-color: #28a745; 
  border-color: #28a745;
  font-size: 1rem;
  
  font-weight: 700;
 border-radius: 4px;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
  color: #fff;
  background-color: #218838; 
  border-color: #1e7e34;
  }
`;

const AddProductButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/add-product");
  };

  return <AddButton onClick={handleAddProductClick}>Add Product</AddButton>;
};

export default AddProductButton;
