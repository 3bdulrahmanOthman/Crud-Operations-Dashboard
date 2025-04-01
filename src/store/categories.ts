import { CategoryService } from "@/lib/services/category";
import { CategoryProps } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CategoryState {
  categories: CategoryProps[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()(
  immer((set) => ({
    categories: [],
    isLoading: false,

    fetchCategories: async () => {
      set({ isLoading: true });
      try {
        const categories = await CategoryService.fetchAll();
        set({ categories, isLoading: false });
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
        set({ isLoading: false });
      }
    },
  }))
);
