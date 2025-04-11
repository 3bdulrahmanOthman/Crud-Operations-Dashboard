import { CategoryService } from "@/lib/services/category";
import { CategoryProps } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CategoryState {
  categories: CategoryProps[];
  isLoading: boolean;
  addCategory: (payload: Omit<CategoryProps, "id" | "slug">) => Promise<void>;
  updateCategory: (id: number, payload: Partial<CategoryProps>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()(
  immer((set) => ({
    categories: [],
    isLoading: false,

    addCategory: async (payload) => {
      try {
        const newCategory = await CategoryService.create(payload);
        set((state) => {
          state.categories.push(newCategory);
        });
      } catch (error) {
        console.error("❌ Error creating category:", error);
        throw error;
      }
    },

    updateCategory: async (id, payload) => {
      try {
        const updatedCategory = await CategoryService.update(id, payload);
        set((state) => {
          const index = state.categories.findIndex((c) => c.id === id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        });
      } catch (error) {
        console.error("❌ Error updating category:", error);
        throw error;
      }
    },

    deleteCategory: async (id) => {
      try {
        await CategoryService.delete(id);
        set((state) => {
          state.categories = state.categories.filter((c) => c.id !== id);
        });
      } catch (error) {
        console.error("❌ Error deleting category:", error);
        throw error;
      }
    },
  }))
);
