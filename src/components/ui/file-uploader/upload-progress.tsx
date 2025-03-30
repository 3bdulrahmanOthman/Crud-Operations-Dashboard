"use client"

import { Loader2 } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useFileUploaderStore } from "@/store/file-uploader"

interface UploadProgressProps {
  className?: string
}

export function UploadProgress({ className }: UploadProgressProps) {
  const { status, progress, files } = useFileUploaderStore()

  if (status !== "uploading") {
    return null
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p>Uploading {files.length} file(s)...</p>
        <span className="ml-auto">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1" />

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">
        Uploading {files.length} files, {progress}% complete
      </div>
    </div>
  )
}