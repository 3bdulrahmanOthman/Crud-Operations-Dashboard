import { CategoryProps } from "@/types";
import api from "../axios";
import { CACHE_TAGS, CACHE_TTL, cachedApiCall } from "../cache";

export const CategoryService = {
  async fetchAll(): Promise<CategoryProps[]> {
    return cachedApiCall(
      "categories:all",
      async () => {
        const { data } = await api.get("/categories");
        return data;
      },
      [CACHE_TAGS.CATEGORIES],
      CACHE_TTL.MEDIUM
    );
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
