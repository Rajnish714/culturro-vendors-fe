import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AddButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const AddProductButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  return (
    <AddButton onClick={handleAddProductClick}>Add Product</AddButton>
  );
};

export default AddProductButton;
