import {create} from "zustand";
import {Product} from "../types";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (
    update: Product[] | ((prevProducts: Product[]) => Product[])
  ) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (productId: string, product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  fetchProductById: (productId: string) => Promise<Product | undefined>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (update) =>
    set((state) => ({
      products: typeof update === "function" ? update(state.products) : update,
    })),
  fetchProducts: async () => {},
  addProduct: async (product: Product) => {},
  updateProduct: async (productId: string, product: Product) => {},
  deleteProduct: async (productId: string) => {},
  fetchProductById: async (productId: string) => Promise.resolve(undefined),
}));
