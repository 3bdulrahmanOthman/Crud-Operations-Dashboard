import type { Metadata } from "next";
import SignInForm from "@/components/forms/form-login";

export const metadata: Metadata = {
  title: "Authentication | Sign In",
  description: 'Sign In page for authentication.',
};

export default async function SignIn() {
  return <SignInForm />;
}
