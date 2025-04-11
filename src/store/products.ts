import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ProductService } from "@/lib/services/product";
import { ProductProps } from "@/types";

interface ProductState {
  products: ProductProps[];
  productsByCategory: Record<string, ProductProps[]>;
  isLoading: boolean;
  addProduct: (product: Omit<ProductProps, "id">) => Promise<void>;
  updateProduct: (product: ProductProps) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>()(
  immer((set) => ({
    products: [],
    productsByCategory: {},
    isLoading: false,

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
        throw error;
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
        throw error;
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
        throw error;
      }
    },
  }))
);
