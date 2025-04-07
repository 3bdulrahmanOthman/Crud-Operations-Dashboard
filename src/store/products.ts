import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ProductService } from "@/lib/services/product";
import { CategoryProps, ProductProps } from "@/types";

interface ProductState {
  products: ProductProps[];
  productsByCategory: Record<string, ProductProps[]>;
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (categoryId: CategoryProps["id"]) => Promise<void>;
  addProduct: (product: Omit<ProductProps, "id">) => Promise<void>;
  updateProduct: (product: ProductProps) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>()(
  immer((set) => ({
    products: [],
    productsByCategory: {},
    isLoading: false,

    fetchProducts: async () => {
      set({ isLoading: true });
      try {
        const products = await ProductService.fetchAll();
        set({ products, isLoading: false });
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        set({ isLoading: false });
      }
    },

    fetchProductsByCategory: async (categoryId: CategoryProps["id"]) => {
      set({ isLoading: true });
      try {
        const products = await ProductService.fetchByCategory(categoryId);
        set((state) => {
          state.productsByCategory[categoryId] = products;
          state.isLoading = false;
        });
      } catch (error) {
        console.error(`❌ Error fetching products for category ${categoryId}:`, error);
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
