import { UserProps } from "@/types";

export const roleStyles: Record<UserProps["role"], string> = {
  admin:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700",
  customer:
    "bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700",
};
