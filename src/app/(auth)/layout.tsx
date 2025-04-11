import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";
import { GitHubStarsButton } from "@/components/animate-ui/github-stars-button";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell
      variant="centered"
      className="relative h-full mx-auto md:p-0 lg:grid lg:max-w-none lg:grid-cols-2 "
    >
      {/* Left Panel */}
      <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex">
        <Image
          src="/authentication.jpg"
          fill
          alt="Login Image"
          priority
          sizes="100%"
          quality={100}
          className="h-full w-full object-cover"
        />
        <div className="relative z-20 flex items-center text-2xl font-medium">
          <Icons.logo className="size-9" />
          Crud Dashboard
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This Crud Dashboard is a game-changer for developers. It
              streamlines the process of managing data, making it easier to
              create, read, update, and delete records. Whether you&apos;re a
              seasoned pro or just starting out, this dashboard is a must-have
              tool in your arsenal.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex h-full w-full flex-col max-w-md items-center justify-center space-y-6 mx-auto p-4 sm:p-6">
        <GitHubStarsButton
          username="3bdulrahmanOthman"
          repo="Crud-Operations-Dashboard"
          className="h-9 has-[>svg]:px-3 rounded-md"
        />

        {children}

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </Shell>
  );
}
