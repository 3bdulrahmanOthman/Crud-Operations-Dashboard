import { create } from "zustand";
import { ProductProps } from "@/types";
import { immer } from "zustand/middleware/immer";
import { ProductService } from "@/lib/api/products";

interface ProductState {
  products: ProductProps[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<ProductProps, "id">) => Promise<void>;
  updateProduct: (product: ProductProps) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>()(
  immer((set) => ({
    products: [],
    isLoading: false,

    fetchProducts: async () => {
      set({ isLoading: true });
      try {
        const products = await ProductService.fetchAll();
        set((state) => {
          state.products = products;
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        set({ isLoading: false });
      }
    },

    addProduct: async (product) => {
      set({ isLoading: true });
      try {
        const newProduct = await ProductService.create(product);
        set((state) => {
          state.products.push(newProduct);
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error adding product:", error);
        set({ isLoading: false });
      }
    },

    updateProduct: async (product) => {
      set({ isLoading: true });
      try {
        const updatedProduct = await ProductService.update(product);
        set((state) => {
          const index = state.products.findIndex((p: ProductProps) => p.id === product.id);
          if (index !== -1) state.products[index] = updatedProduct;
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error updating product:", error);
        set({ isLoading: false });
      }
    },

    deleteProduct: async (id) => {
      set({ isLoading: true });
      try {
        await ProductService.remove(id);
        set((state) => {
          state.products = state.products.filter((p: ProductProps) => p.id !== id);
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error deleting product:", error);
        set({ isLoading: false });
      }
    },
  }))
);
