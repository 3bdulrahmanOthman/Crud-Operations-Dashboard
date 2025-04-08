import { CategoryProps } from "@/types";
import api from "../axios";

export const CategoryService = {
  async fetchAll(): Promise<CategoryProps[]> {
    const { data } = await api.get("/categories");
    return data;
  },

  async fetchById(id: CategoryProps["id"]): Promise<CategoryProps> {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },

  async create(category: Omit<CategoryProps, "id" | "slug">): Promise<CategoryProps> {
    const { data } = await api.post("/categories", category);
    return data;
  },

  async update(id: CategoryProps["id"], category: Partial<CategoryProps>): Promise<CategoryProps> {
    const { data } = await api.put(`/categories/${id}`, category);
    return data;
  },

  async delete(id: CategoryProps["id"]): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
