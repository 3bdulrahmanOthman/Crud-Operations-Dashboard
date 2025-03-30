import api from "../axios";
import { ProductProps } from "@/types";

export const ProductService = {
  async fetchAll(): Promise<ProductProps[]> {
    const { data } = await api.get("/products");
    return data;
  },

  async create(product: Omit<ProductProps, "id">): Promise<ProductProps> {
    const { data } = await api.post("/products", product);
    return data;
  },

  async update(product: ProductProps): Promise<ProductProps> {
    const { data } = await api.put(`/products/${product.id}`, product);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
