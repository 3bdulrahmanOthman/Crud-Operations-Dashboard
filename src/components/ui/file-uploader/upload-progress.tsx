"use client"

import { Loader2 } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useFileUploaderStore } from "@/store/file-uploader"

interface UploadProgressProps {
  className?: string
  showDetailedInfo?: boolean
}

export function UploadProgress({ className, showDetailedInfo = false }: UploadProgressProps) {
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

      {showDetailedInfo && (
        <div className="text-xs text-muted-foreground">
          <p>Uploading: {files.map((f) => f.name).join(", ")}</p>
          <p>Total size: {(files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">
        Uploading {files.length} files, {progress}% complete
      </div>
    </div>
  )
}

