"use client";

import { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { loginSchema } from "@/lib/validation/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PasswordInput } from "../password-input";
import { signIn } from "next-auth/react";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(() => {
      toast.promise(signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }), {
        loading: "Logging in...",
        success: () => {
          router.replace("/dashboard");
          return "Login successful!";
        },
        error: "Invalid email or password",
      });
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the dashboard
        </CardDescription>
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
                      placeholder="123@abc!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                  <span>Login...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Alert>
          <Icons.user className="size-4" />
          <AlertTitle>Demo credentials:</AlertTitle>
          <AlertDescription>
            <div className="flex items-center gap-2">
              <Icons.mailPlus className="size-4 text-muted" />
              <span>
                Mail: <strong>admin@mail.com</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Icons.lock className="size-4 text-muted" />
              <span>
                Password: <strong>admin123</strong>
              </span>
            </div>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}
