"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFileUploaderStore } from "@/store/file-uploader"
import { Trash2 } from "lucide-react"
import type { FileType } from "@/lib/validation/file-uploader"

interface FilePreviewListProps {
  className?: string
  disabled?: boolean
  onChange?: (urls: string[]) => void
  layout?: "grid" | "list"
  fileType?: FileType
  showFileName?: boolean
  previewSize?: "sm" | "md" | "lg"
}

export function FilePreviewList({
  className,
  disabled = false,
  onChange,
  layout = "list",
  fileType = "image",
  showFileName = false,
  previewSize = "md",
}: FilePreviewListProps) {
  const { uploadedUrls, removeFile } = useFileUploaderStore()

  if (uploadedUrls.length === 0) {
    return null
  }

  const handleRemove = (url: string) => {
    if (disabled) return
    removeFile(url)

    if (onChange) {
      const newUrls = uploadedUrls.filter((u) => u !== url)
      onChange(newUrls)
    }
  }

  // Get file name from URL
  const getFileName = (url: string) => {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      return pathname.substring(pathname.lastIndexOf("/") + 1)
    } catch {
      return url.substring(url.lastIndexOf("/") + 1)
    }
  }

  // Determine preview size
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  }

  // Determine if we should render an image or a document icon
  const renderPreview = (url: string, index: number) => {
    if (fileType === "image") {
      return (
        <Image
          src={url || "/placeholder.svg"}
          alt={`Uploaded image ${index + 1}`}
          width={previewSize === "sm" ? 32 : previewSize === "md" ? 48 : 64}
          height={previewSize === "sm" ? 32 : previewSize === "md" ? 48 : 64}
          loading="lazy"
          className={cn("aspect-square shrink-0 rounded-md object-cover", sizeClasses[previewSize])}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=100&width=100"
          }}
        />
      )
    } else {
      // For non-image files, show an appropriate icon
      return (
        <div className={cn("flex items-center justify-center bg-muted rounded-md", sizeClasses[previewSize])}>
          <span className="text-xs text-muted-foreground">{url.substring(url.lastIndexOf(".") + 1).toUpperCase()}</span>
        </div>
      )
    }
  }

  return (
    <div
      className={cn(
        layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" : "space-y-2",
        className,
      )}
    >
      {uploadedUrls.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className={cn("relative flex items-center justify-center", layout === "grid" ? "group" : "space-x-4")}
        >
          {/* Preview */}
          <div className={layout === "grid" ? "relative" : "flex flex-1 space-x-4"}>
            {renderPreview(url, index)}

            {showFileName && (
              <span className={cn("text-sm truncate", layout === "grid" ? "block mt-1" : "")}>{getFileName(url)}</span>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "size-7 text-destructive",
              layout === "grid" ? "absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" : "",
              disabled && "cursor-not-allowed",
            )}
            onClick={() => handleRemove(url)}
            disabled={disabled}
            aria-label={`Remove file ${index + 1}`}
          >
            <Trash2 className="size-4" aria-hidden="true" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      ))}
    </div>
  )
}

