import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  categoryId: z.coerce.number().positive({ message: "Category is required" }),
  images: z
    .array(z.string().url({ message: "Must be a valid URL" }))
    .min(1, { message: "At least one image is required" }),
  isEdit: z.boolean().default(false),
});