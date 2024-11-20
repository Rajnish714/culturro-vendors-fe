import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useProducts} from "../hooks/ProductHooks";
import {Product} from "../types";
import ProductForm from "../components/ProductForm";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const EditProductPage: React.FC = () => {
  const {fetchProductById, updateProduct, products} = useProducts();
  const {productId} = useParams<{productId: string}>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      const fetchProduct = async () => {
        if (productId) {
          try {
            const productData = await fetchProductById(productId);
            if (productData) {
              setProduct(productData);
            } else {
              console.error("Product not found");
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }
      };
      fetchProduct();
    }
  }, [productId, products, fetchProductById]);

  const handleSubmit = async (updatedProduct: Product) => {
    try {
      if (productId) {
        await updateProduct(productId, updatedProduct);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
