"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useFileUploaderStore } from "@/store/file-uploader"
import { DropzoneArea } from "./dropzone-area"
import { ErrorDisplay } from "./error-display"
import { UploadProgress } from "./upload-progress"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface AvatarUploaderProps {
  onChange: (url: string) => void
  value?: string
  maxSize?: number
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function AvatarUploader({
  onChange,
  value,
  maxSize = 2,
  disabled = false,
  className,
  size = "md",
}: AvatarUploaderProps) {
  const { uploadedUrls, setUploadedUrls, removeFile, reset } = useFileUploaderStore()

  // Reset error state when component mounts
  useEffect(() => {
    reset()
  }, [reset])

  // Sync external value with store
  useEffect(() => {
    if (value && uploadedUrls.length === 0) {
      setUploadedUrls([value])
    } else if (!value && uploadedUrls.length > 0) {
      setUploadedUrls([])
    } else if (value && uploadedUrls.length > 0 && value !== uploadedUrls[0]) {
      setUploadedUrls([value])
    }
  }, [value, uploadedUrls, setUploadedUrls])

  // Handle changes from internal components
  const handleChange = (urls: string[]) => {
    onChange(urls.length > 0 ? urls[0] : "")
  }

  const handleRemove = () => {
    if (disabled) return
    removeFile(uploadedUrls[0])
    onChange("")
  }

  // Size classes
  const sizeClasses = {
    sm: "size-16",
    md: "size-24",
    lg: "size-32",
    xl: "size-40",
  }

  return (
    <div className={cn("space-y-4", className)}>
      {uploadedUrls.length === 0 ? (
        <DropzoneArea
          fileType="image"
          uploadEndpoint="avatar"
          maxFiles={1}
          maxSize={maxSize}
          disabled={disabled}
          onChange={handleChange}
          shape="circle"
          height={sizeClasses[size]}
          customText={{
            prompt: "Upload avatar",
            fileTypes: "Image files only (JPG, PNG, GIF, WEBP)",
            sizeInfo: `Max ${maxSize}MB`,
          }}
        />
      ) : (
        <div className="relative group">
          <Image
            src={uploadedUrls[0] || "/placeholder.svg"}
            alt="Avatar"
            width={size === "sm" ? 64 : size === "md" ? 96 : size === "lg" ? 128 : 160}
            height={size === "sm" ? 64 : size === "md" ? 96 : size === "lg" ? 128 : 160}
            className={cn("rounded-full object-cover", sizeClasses[size], disabled && "opacity-50")}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=100&width=100"
            }}
          />

          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute bottom-0 right-0 size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
              aria-label="Remove avatar"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              <span className="sr-only">Remove avatar</span>
            </Button>
          )}
        </div>
      )}
      <UploadProgress />
      <ErrorDisplay showDetailedErrors={false} />
    </div>
  )
}

