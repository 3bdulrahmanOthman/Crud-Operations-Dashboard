import api from "../axios";
import { CategoryProps, ProductProps } from "@/types";
import { CategoryService } from "./category";

export const ProductService = {
  async fetchAll(): Promise<ProductProps[]> {
    const { data } = await api.get("/products");
    return data;
  },

  async fetchByCategory(id: CategoryProps["id"]): Promise<ProductProps[]> {
    const { data } = await api.get(`/categories/${id}/products`);
    return data;
  },

  async create(product: Omit<ProductProps, "id">): Promise<ProductProps> {
    const { data } = await api.post("/products", product);
    return data;
  },

  async update(product: ProductProps): Promise<ProductProps> {
    const { data } = await api.put(`/products/${product.id}`, product);

    {/* Manually update category object because backend doesn't do it */}
    const updatedCategory = await CategoryService.fetchById(product.categoryId)
    return { ...data, category: updatedCategory };
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
