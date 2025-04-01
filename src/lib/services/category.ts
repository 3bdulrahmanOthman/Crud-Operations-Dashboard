import { CategoryProps } from "@/types";
import api from "../axios";

export const CategoryService = {
    async fetchAll(): Promise<CategoryProps[]> {
      const { data } = await api.get(`/categories`);
      return data;
    },
  };