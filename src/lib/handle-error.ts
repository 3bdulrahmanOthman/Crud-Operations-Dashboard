import { AxiosError } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { toast } from "sonner";
import { z } from "zod";

export function getErrorMessage(err: unknown): string {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    return err.issues.map((issue) => issue.message).join("\n");
  }
  if (err instanceof Error) {
    if (err instanceof AxiosError) {
      if (err.response) {
        return err.response.data?.message || err.response.data?.error;
      }
      return err.message || "Network error. Please try again later.";
    }

    return err.message;
  }
  if (err instanceof Response) {
    return `HTTP Error: ${err.status} - ${err.statusText}`;
  }
  if (typeof err === "string") {
    return err;
  }
  if (isRedirectError(err)) {
    throw err;
  }

  return unknownError;
}

let lastErrorMessage = "";
export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);

  if (errorMessage !== lastErrorMessage) {
    toast.error(errorMessage);
    lastErrorMessage = errorMessage;

    setTimeout(() => (lastErrorMessage = ""), 3000);
  }
}
