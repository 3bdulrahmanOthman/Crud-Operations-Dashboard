import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import "@/lib/axios";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Advanced CRUD Dashboard with Next.js and Shadcn UI",
  authors: [
    {
      name: "Abdulrahman Othman",
      url: "https://github.com/3bdulrahmanOthman",
    },
  ],
  keywords: [
    "Ecommerce",
    "Admin Panel",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} />
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
