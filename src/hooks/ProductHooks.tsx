import {useState} from "react";
import axios from "axios";
import {useProductStore} from "../store/useProductStore";
import {Product} from "../types";

const API_URL = "http://localhost:8000/v1";

const getTokenConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export function useProducts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {products, setProducts} = useProductStore();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/vendor/product/products`,
        getTokenConfig()
      );
      setProducts(response.data);
      console.log("Fetched Products:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/vendor/product/create`,
        product,
        getTokenConfig()
      );
      setProducts((prevProducts: Product[]) => [
        ...prevProducts,
        response.data,
      ]);
      console.log("Product Added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId: string, product: Product) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/vendor/product/update/${productId}`,
        product,
        getTokenConfig()
      );
      setProducts((prevProducts: Product[]) =>
        prevProducts.map((p) => (p.id === productId ? response.data : p))
      );
      console.log("Product Updated:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `${API_URL}/vendor/product/delete/${productId}`,
        getTokenConfig()
      );
      setProducts((prevProducts: Product[]) =>
        prevProducts.filter((p) => p.id !== productId)
      );
      console.log("Product Deleted:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (
    productId: string
  ): Promise<Product | undefined> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/vendor/product/products/${productId}`,
        getTokenConfig()
      );
      console.log("Fetched Product:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      setError((error as Error).message);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProductById,
  };
}
