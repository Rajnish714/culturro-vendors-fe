import { create } from 'zustand';
import axios from 'axios';
import { Product } from '../types'; // Centralized type definition

const API_URL = "http://localhost:8000/v1";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3YjQxYjFiLTI3MjYtNGQyMy1iOTYyLTYwMTdlMWZlY2FkZCIsImVtYWlsIjoibWFuaXNoQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMxOTMwNzM4LCJleHAiOjE3MzIwMTcxMzh9.REsDBnbtol7qc60cE-eK-LvQ02y42u932ZCBVgV11cY';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (productId: string, product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  fetchProductById: (productId: string) => Promise<Product | undefined>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    if (get().loading) return; // Prevent re-fetch if already loading
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/vendor/product/products`, config);
      console.log(response);
      
      set({ products: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  addProduct: async (product: Product) => {
    try {
      const response = await axios.post(`${API_URL}/vendor/product/create`, product, config);
      set((state) => ({ products: [...state.products, response.data] }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  updateProduct: async (productId: string, product: Product) => {
    try {
      const response = await axios.put(`${API_URL}/vendor/product/update/${productId}`, product, config);
      set((state) => ({
        products: state.products.map(p => p.id === productId ? response.data : p)
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteProduct: async (productId: string) => {
     try { 
        await axios.delete(`${API_URL}/vendor/product/delete/${productId}`, config);
         set((state) => ({ products: state.products.filter(p => p.id !== productId) })); 
        } 
  catch (error: any) { set({ error: error.message }); } },
  
  fetchProductById: async (productId: string) => {
    try {
      const response = await axios.get(`${API_URL}/vendor/product/products/${productId}`, config);
      
      return response.data;
     
      
    } catch (error: any) {
      set({ error: error.message });
      return undefined;
    }
  }
}));

