import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/breakpoints'; // Import breakpoints
import { useNavigate } from 'react-router-dom';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  @media ${device.mobileS} {
    width: 100%;
    overflow-x: auto;
  }

  @media ${device.laptop} {
    width: 80%;
  }
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 0.5rem;
  border: 1px solid #ddd;

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

  @media ${device.mobileS} {
    padding: 0.3rem;
  }

  @media ${device.laptop} {
    padding: 0.5rem;
  }
`;


interface Product {
    id: number;
    name: string;
    description:string;
    category: string;
    stockQuantity: number;
    price: number;
  }
  
  interface ProductTableProps {
    products: Product[];
  }
  



const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const navigate = useNavigate();
  const handleEditClick = (productId: string) => { navigate(`/edit-product/${productId}`); };
  return (
    <Table>
      <thead>
        <tr>
          <Th>S.no</Th>
          <Th>Product name</Th>
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
           
            
          <tr key={product.id}>
            <Td>{index + 1 }</Td>
            <Td>{product.name}</Td>
            <Td>{product.description}</Td>
            <Td>{product.category}</Td>
            <Td>{product.stockQuantity}</Td>
            <Td>{product.price}</Td>
            <Td><button onClick={() => handleEditClick(product.id.toString())}>Edit</button></Td>
            <Td><button>Delete</button></Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;



// import React from 'react';
// import styled from 'styled-components';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 1rem 0;
// `;

// const Th = styled.th`
//   background-color: #f4f4f4;
//   padding: 0.5rem;
//   border: 1px solid #ddd;
// `;

// const Td = styled.td`
//   padding: 0.5rem;
//   border: 1px solid #ddd;
// `;

// const ProductTable: React.FC = () => {
//   const products = [
//     { id: 1, name: 'Product 1', category: 'Category 1', quantity: 10, price: 100 },
//     // Add more products here
//   ];

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <Th>S.no</Th>
//           <Th>Product name</Th>
//           <Th>Category</Th>
//           <Th>Quantity</Th>
//           <Th>Price</Th>
//           <Th>Edit</Th>
//           <Th>Delete</Th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product, index) => (
//           <tr key={product.id}>
//             <Td>{index + 1}</Td>
//             <Td>{product.name}</Td>
//             <Td>{product.category}</Td>
//             <Td>{product.quantity}</Td>
//             <Td>{product.price}</Td>
//             <Td><button>Edit</button></Td>
//             <Td><button>Delete</button></Td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default ProductTable;

