import React, {useState} from "react";
import styled from "styled-components";
import {device} from "../styles/breakpoints";
import {useNavigate} from "react-router-dom";
import {Product} from "../types";
import {useProducts} from "../hooks/ProductHooks";

const TableContainer = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  position: relative;

  @media ${device.laptop} {
    width: 80%;
    margin: 0 auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  table-layout: fixed;

  @media ${device.mobileS} {
    width: 100%;
  }

  @media ${device.laptop} {
    width: 100%;
  }
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 0.5rem;
  border: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: inset 0 -1px 0 #ddd;

  @media ${device.mobileS} {
    padding: 0.3rem;
  }

  @media ${device.laptop} {
    padding: 0.5rem;
  }
`;

const Td = styled.td`
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${device.mobileS} {
    padding: 0.3rem;
  }

  @media ${device.laptop} {
    padding: 0.5rem;
  }
`;

const TableRow = styled.tr`
  &:hover {
    box-shadow: 2px 2px 2px 3px black;

`;

const DescriptionTd = styled(Td)`
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  color: white;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const EditButton = styled(Button)`
  color: #fff;
  background-color: #ffc107;
  border-color: #ffc107;

  &:hover {
    color: #fff;
    background-color: #e0a800;
    border-color: #d39e00;
  }
`;

const DeleteButton = styled(Button)`
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;

  &:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const ModalContent = styled.div`
  max-height: calc(80vh - 3rem); /* Ensure content scrolls within modal */
  overflow-y: auto;
  margin-bottom: 1rem;
  white-space: pre-wrap; /* Ensure text wraps and respects newlines */
  word-wrap: break-word; /* Break words as needed */
  overflow-wrap: break-word; /* Break words as needed */
`;

const CloseButton = styled(Button)`
  position: sticky;
  bottom: 0;
  background-color: #007bff;
  border-color: #007bff;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({products}) => {
  const {deleteProduct} = useProducts();
  const navigate = useNavigate();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const handleEditClick = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDeleteClick = async (productId: string) => {
    setLoadingProductId(productId);
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleDescriptionClick = (description: string) => {
    setModalContent(description);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>S.no</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <Td>{index + 1}</Td>
              <Td>{product.name}</Td>
              <DescriptionTd
                onClick={() => handleDescriptionClick(product.description)}
              >
                {product.description}
              </DescriptionTd>
              <Td>{product.category}</Td>
              <Td>{product.stockQuantity}</Td>
              <Td>
                <span>&#8377;</span>
                {product.price}
              </Td>
              <Td>
                <EditButton onClick={() => handleEditClick(product.id)}>
                  Edit
                </EditButton>
              </Td>
              <Td>
                {loadingProductId === product.id ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <DeleteButton onClick={() => handleDeleteClick(product.id)}>
                    Delete
                  </DeleteButton>
                )}
              </Td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {modalContent && (
        <ModalBackground onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <h3>Description</h3>
            <ModalContent>{modalContent}</ModalContent>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContainer>
        </ModalBackground>
      )}
    </TableContainer>
  );
};

export default ProductTable;
