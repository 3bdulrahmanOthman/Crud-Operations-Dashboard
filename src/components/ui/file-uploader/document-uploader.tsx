"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useFileUploaderStore } from "@/store/file-uploader"
import { DropzoneArea } from "./dropzone-area"
import { ErrorDisplay } from "./error-display"
import { UploadProgress } from "./upload-progress"
import { FilePreviewList } from "./file-preview-list"

interface DocumentUploaderProps {
  onChange: (urls: string[]) => void
  value: string[]
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  className?: string
  showFileName?: boolean
}

export function DocumentUploader({
  onChange,
  value = [],
  maxFiles = 5,
  maxSize = 10,
  disabled = false,
  className,
  showFileName = true,
}: DocumentUploaderProps) {
  const { uploadedUrls, setUploadedUrls, reset } = useFileUploaderStore()

  // Reset error state when component mounts
  useEffect(() => {
    reset()
  }, [reset])

  // Sync external value with store
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(uploadedUrls)) {
      setUploadedUrls(value)
    }
  }, [value, uploadedUrls, setUploadedUrls])

  // Handle changes from internal components
  const handleChange = (urls: string[]) => {
    onChange(urls)
  }

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <DropzoneArea
        fileType="document"
        uploadEndpoint="document"
        maxFiles={maxFiles}
        maxSize={maxSize}
        disabled={disabled}
        onChange={handleChange}
        customText={{
          prompt: "Drag & drop documents here, or click to select",
          fileTypes: "Document files only (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT)",
          sizeInfo: `Max ${maxSize}MB per file • Up to ${maxFiles} files`,
        }}
      />
      <FilePreviewList disabled={disabled} onChange={handleChange} fileType="document" showFileName={showFileName} />
      <UploadProgress />
      <ErrorDisplay />
    </div>
  )
}

