"use client";

import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { useFileUploaderStore } from "@/store/file-uploader";

interface DropzoneAreaProps {
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  onChange?: (urls: string[]) => void;
}

export function DropzoneArea({
  maxFiles = 10,
  maxSize = 4, // in MB
  disabled = false,
  className,
  onChange,
}: DropzoneAreaProps) {
  const {
    uploadedUrls,
    setFiles,
    setRejectedFiles,
    startUpload: startUploadState,
    updateProgress,
    uploadSuccess,
    uploadError,
  } = useFileUploaderStore();

  const [dragDepth, setDragDepth] = useState(0);

  const { startUpload, isUploading } = useUploadThing("productImage", {
    onClientUploadComplete: (res) => {
      const newUrls = res.map((file) => file.ufsUrl);
      uploadSuccess(newUrls);
      if (onChange) {
        onChange([...uploadedUrls, ...newUrls]);
      }
    },
    onUploadProgress: (progress) => {
      updateProgress(progress);
    },
    onUploadError: (error) => {
      uploadError(error);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setFiles(acceptedFiles);
        startUploadState();
        startUpload(acceptedFiles);
      }

      if (rejectedFiles.length > 0) {
        setRejectedFiles(rejectedFiles);
      }
    },
    [setFiles, setRejectedFiles, startUploadState, startUpload]
  );

  const handleDragEnter = useCallback(() => {
    setDragDepth((prev) => prev + 1);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragDepth((prev) => prev - 1);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    },
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles,
    disabled: isUploading || disabled || uploadedUrls.length >= maxFiles,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
  });

  // isDragActive is true only when dragDepth > 0
  const isActive = dragDepth > 0 || isDragActive;

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200",
        isActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-muted-foreground/25 hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        uploadedUrls.length >= maxFiles && "opacity-50 cursor-not-allowed",
        className
      )}
      aria-disabled={disabled || uploadedUrls.length >= maxFiles}
      role="button"
      tabIndex={0}
      aria-label="Upload files by dropping them here or click to select"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
        <Upload className="size-7 mb-2 text-muted-foreground" />

        <p className="font-medium">
          {uploadedUrls.length >= maxFiles
            ? "Maximum number of files reached"
            : "Drag & drop files here, or click to select files"}
        </p>
        <p>Image files only (JPG, PNG, GIF, WEBP)</p>
        <p>
          Max {maxSize}MB per file • Up to {maxFiles} files
        </p>
        {uploadedUrls.length > 0 && (
          <p>
            {uploadedUrls.length} of {maxFiles} files uploaded
          </p>
        )}
      </div>
    </div>
  );
}
