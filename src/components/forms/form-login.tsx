"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { signInSchema } from "@/lib/validation/auth";
import { showErrorToast } from "@/lib/handle-error";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LoginFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "admin@mail.com",
      password: "admin123",
    },
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    (data: LoginFormValues) => {
      startTransition(async () => {
        try {
          const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (response?.ok) {
            toast.success("Login successful!");
            router.replace("/dashboard");
          }
        } catch (error) {
          console.error("Login error:", error);
          showErrorToast(error);
        }
      });
    },
    [router]
  );

  return (
    <Card className="w-full border-border/10">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-lg">Sign in to your account</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue
        </CardDescription>

        <div className="w-full grid sm:grid-cols-2 gap-4 mt-6">
          <Button
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={() => {
              startTransition(async () => {
                await signIn("google", { callbackUrl: "/dashboard" });
              });
            }}
            aria-label="Sign in with Google"
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.google className="size-4" />
            )}
            <span className="text-sm text-muted-foreground">
              Sign in with Google
            </span>
          </Button>

          <Button
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={() => {
              startTransition(async () => {
                await signIn("github", { callbackUrl: "/dashboard" });
              });
            }}
            aria-label="Sign in with Github"
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.gitHub className="size-4" />
            )}
            <span className="text-sm text-muted-foreground">
              Sign in with Github
            </span>
          </Button>
        </div>

        <div className="w-full flex items-center mt-6">
          <div className="w-full border-t border-border h-px" />
          <span className="mx-4 text-sm text-muted-foreground whitespace-nowrap">
            or continue with e-mail
          </span>
          <div className="w-full border-t border-border h-px" />
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || isPending}
            >
              {form.formState.isSubmitting || isPending ? (
                <>
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?
        </span>
        <Link
          href="/signup"
          className={cn(buttonVariants({ variant: "link", size: "sm" }), "p-1")}
        >
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}
