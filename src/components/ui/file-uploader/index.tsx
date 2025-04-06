"use client"

import { useEffect } from "react"
import { DropzoneArea } from "./dropzone-area"
import { ErrorDisplay } from "./error-display"
import { cn } from "@/lib/utils"
import { useFileUploaderStore } from "@/store/file-uploader"
import { FilePreviewList } from "./file-preview-list"
import { UploadProgress } from "./upload-progress"
import type { FileType } from "@/lib/validation/file-uploader"

export interface FileUploaderProps {
  onChange: (urls: string[]) => void
  value: string[]
  fileType?: FileType
  uploadEndpoint: "avatar" | "productImage" | "categoryImage" | "document"
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  className?: string
  shape?: "square" | "rounded" | "circle"
  previewLayout?: "grid" | "list"
  previewSize?: "sm" | "md" | "lg"
  showFileName?: boolean
  height?: string
  customText?: {
    prompt?: string
    fileTypes?: string
    sizeInfo?: string
  }
}

export function FileUploader({
  onChange,
  value = [],
  fileType = "image",
  uploadEndpoint,
  maxFiles,
  maxSize,
  disabled = false,
  className,
  shape = "rounded",
  previewLayout = "list",
  previewSize = "md",
  showFileName = false,
  height = "auto",
  customText,
}: FileUploaderProps) {
  const { uploadedUrls, setUploadedUrls, reset } = useFileUploaderStore()

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(uploadedUrls)) {
      setUploadedUrls(value)
    }
  }, [value, uploadedUrls, setUploadedUrls])

  const handleChange = (urls: string[]) => {
    onChange(urls)
  }

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <DropzoneArea
        fileType={fileType}
        uploadEndpoint={uploadEndpoint}
        maxFiles={maxFiles}
        maxSize={maxSize}
        disabled={disabled}
        onChange={handleChange}
        shape={shape}
        height={height}
        customText={customText}
      />
      <FilePreviewList
        disabled={disabled}
        onChange={handleChange}
        layout={previewLayout}
        fileType={fileType}
        showFileName={showFileName}
        previewSize={previewSize}
      />
      <UploadProgress />
      <ErrorDisplay />
    </div>
  )
}

FileUploader.displayName = "FileUploader"

export default FileUploader

