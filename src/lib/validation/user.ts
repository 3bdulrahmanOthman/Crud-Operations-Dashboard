import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1, "First name is required"),
    email: z.string().email("Invalid email address"),
    avatar: z.string().url("Invalid URL"),
    role: z.enum(["customer", "admin"], {
      required_error: "Role is required",
    }),
    password: z.string().optional(),
    isEdit: z.boolean().default(false),
  })
  .superRefine(async (data, ctx) => {
    if (!data.isEdit) {
      if (!data.password || data.password.length < 8) {
        ctx.addIssue({
          path: ["password"],
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Password must be at least 8 characters long",
        });
      } else if (!/^[A-Za-z0-9]+$/.test(data.password)) {
        ctx.addIssue({
          path: ["password"],
          code: z.ZodIssueCode.custom,
          message: "Password must contain only letters and numbers",
        });
      }
    }

    // disabled for now, as the API is always returning a false response
    // if (!data.isEdit) {
    //   const isAvailable = await UserService.checkEmail(data.email);
    //   if (!isAvailable) {
    //     ctx.addIssue({
    //       path: ["email"],
    //       code: z.ZodIssueCode.custom,
    //       message: "This email is already taken",
    //     });
    //   }
    // }
  });
