"use client"

import { useCallback, useState } from "react"
import { useDropzone, type FileRejection } from "react-dropzone"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { UploadEndpoint, useUploadThing } from "@/lib/uploadthing"
import { useFileUploaderStore } from "@/store/file-uploader"
import { getAcceptFromPreset, validationPresets, type FileType } from "@/lib/validation/file-uploader"

interface DropzoneAreaProps {
  fileType?: FileType
  uploadEndpoint: UploadEndpoint;
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  className?: string
  shape?: "square" | "rounded" | "circle"
  height?: string
  onChange?: (urls: string[]) => void
  customText?: {
    prompt?: string
    fileTypes?: string
    sizeInfo?: string
  }
}

export function DropzoneArea({
  fileType = "image",
  uploadEndpoint,
  maxFiles,
  maxSize,
  disabled = false,
  className,
  shape = "rounded",
  height = "auto",
  onChange,
  customText,
}: DropzoneAreaProps) {
  const {
    uploadedUrls,
    setFiles,
    setRejectedFiles,
    startUpload: startUploadState,
    updateProgress,
    uploadSuccess,
    uploadError,
  } = useFileUploaderStore()

  const [dragDepth, setDragDepth] = useState(0)

  const preset = validationPresets[fileType]
  const effectiveMaxFiles = maxFiles ?? preset.maxFiles
  const effectiveMaxSize = maxSize ?? preset.maxSize

  const { startUpload, isUploading } = useUploadThing(uploadEndpoint, {
    onClientUploadComplete: (res) => {
      const newUrls = res.map((file) => file.ufsUrl)
      uploadSuccess(newUrls)
      if (onChange) {
        onChange([...uploadedUrls, ...newUrls])
      }
    },
    onUploadProgress: (progress) => {
      updateProgress(progress)
    },
    onUploadError: (error) => {
      uploadError(error)
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setFiles(acceptedFiles)
        startUploadState()
        startUpload(acceptedFiles)
      }

      if (rejectedFiles.length > 0) {
        setRejectedFiles(rejectedFiles)
      }
    },
    [setFiles, setRejectedFiles, startUploadState, startUpload],
  )

  const handleDragEnter = useCallback(() => {
    setDragDepth((prev) => prev + 1)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragDepth((prev) => prev - 1)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptFromPreset(preset),
    maxSize: effectiveMaxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles: effectiveMaxFiles,
    disabled: isUploading || disabled || uploadedUrls.length >= effectiveMaxFiles,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
  })

  // isDragActive is true only when dragDepth > 0
  const isActive = dragDepth > 0 || isDragActive

  // Determine shape classes
  const shapeClasses = {
    square: "rounded-md",
    rounded: "rounded-lg",
    circle: "rounded-full aspect-square",
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed p-4 text-center transition-all duration-200",
        shapeClasses[shape],
        isActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/25 hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        uploadedUrls.length >= effectiveMaxFiles && "opacity-50 cursor-not-allowed",
        height !== "auto" && height,
        className,
      )}
      aria-disabled={disabled || uploadedUrls.length >= effectiveMaxFiles}
      role="button"
      tabIndex={0}
      aria-label="Upload files by dropping them here or click to select"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
        <Upload className="size-7 mb-2 text-muted-foreground" />

        <p className="font-medium">
          {uploadedUrls.length >= effectiveMaxFiles
            ? "Maximum number of files reached"
            : customText?.prompt || "Drag & drop files here, or click to select files"}
        </p>
        <p>
          {customText?.fileTypes ||
            `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} files only (${preset.acceptedFileTypes.join(", ")})`}
        </p>
        <p>
          {customText?.sizeInfo ||
            `Max ${effectiveMaxSize}MB per file • Up to ${effectiveMaxFiles} file${effectiveMaxFiles > 1 ? "s" : ""}`}
        </p>
        {uploadedUrls.length > 0 && (
          <p>
            {uploadedUrls.length} of {effectiveMaxFiles} files uploaded
          </p>
        )}
      </div>
    </div>
  )
}

