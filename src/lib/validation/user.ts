import { z } from "zod";
import { UserService } from "../services/user";

export const userSchema = z
  .object({
    name: z.string().min(1, "First name is required"),
    email: z.string().email("Invalid email address"),
    avatar: z.string().url("Invalid URL"),
    role: z.enum(["customer", "admin"], {
      required_error: "Role is required",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^[A-Za-z0-9]+$/, "Password must contain only letters and numbers"),

    isEdit: z.boolean().default(false),
  })
  .superRefine(async (data, ctx) => {
    if (!data.isEdit) {
      const isAvailable = await UserService.checkEmail(data.email);
      if (!isAvailable) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "This email is already taken",
        });
      }
    }
  });
