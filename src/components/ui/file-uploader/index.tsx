"use client";

import { useEffect } from "react";
import { DropzoneArea } from "./dropzone-area";
import { ErrorDisplay } from "./error-display";
import { cn } from "@/lib/utils";
import { useFileUploaderStore } from "@/store/file-uploader";
import { FilePreviewList } from "./file-preview-list";
import { UploadProgress } from "./upload-progress";

interface FileUploaderProps {
  onChange: (urls: string[]) => void;
  value: string[];
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

export function FileUploader({
  onChange,
  value = [],
  maxFiles = 10,
  maxSize = 4, // in MB
  disabled = false,
  className,
}: FileUploaderProps) {
  const { uploadedUrls, setUploadedUrls } = useFileUploaderStore();

  // Sync external value with store
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(uploadedUrls)) {
      setUploadedUrls(value);
    }
  }, [value, uploadedUrls, setUploadedUrls]);

  // Handle changes from internal components
  const handleChange = (urls: string[]) => {
    onChange(urls);
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <DropzoneArea
        maxFiles={maxFiles}
        maxSize={maxSize}
        disabled={disabled}
        onChange={handleChange}
      />
      <FilePreviewList disabled={disabled} onChange={handleChange} />
      <UploadProgress />
      <ErrorDisplay />
    </div>
  );
}

FileUploader.displayName = "FileUploader";

export default FileUploader;
