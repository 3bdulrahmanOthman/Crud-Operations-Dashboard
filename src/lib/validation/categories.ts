import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  image: z
    .array(z.string().url({ message: "Must be a valid URL" }))
    .min(1, { message: "At least one image is required" }),
  isEdit: z.boolean().optional(),
});
