"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-bounce rounded-full bg-primary opacity-10" />
        <h1 className="relative z-10 text-7xl font-bold text-primary sm:text-8xl">404</h1>
      </div>

      <p className="mt-4 text-lg text-muted-foreground">
        Oops, the page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Button asChild className="mt-6">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
