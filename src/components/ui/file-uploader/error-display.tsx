"use client";
import { AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useFileUploaderStore } from "@/store/file-uploader";
import { getErrorMessage } from "@/lib/handle-error";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  className?: string;
  showDetailedErrors?: boolean;
}

export function ErrorDisplay({
  className,
  showDetailedErrors = true,
}: ErrorDisplayProps) {
  const { status, error, rejectedFiles, clearError, clearRejectedFiles } =
    useFileUploaderStore();

  // Format file rejection errors
  const formatRejectionErrors = () => {
    if (rejectedFiles.length === 0 || !showDetailedErrors) return null;

    return (
      <div className="mt-2">
        <h4 className="text-sm font-medium">Rejected files:</h4>
        <ul className="mt-1 text-xs list-disc list-inside">
          {rejectedFiles.map((rejection, index) => (
            <li key={index}>
              {rejection.file.name} -{" "}
              {rejection.errors.map((e) => e.message).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Handle dismissing the error alert
  const handleDismiss = () => {
    clearError();
    clearRejectedFiles();
  };

  if (status !== "error" && rejectedFiles.length === 0) {
    return null;
  }

  return (
    <Alert
      variant="destructive"
      className={cn("animate-in fade-in-50 relative", className)}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Upload Error</AlertTitle>
      <AlertDescription>
        {getErrorMessage(error) || "There was an error uploading your files."}
        {formatRejectionErrors()}
      </AlertDescription>

      {/* Dismiss button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 size-6 text-destructive-foreground hover:bg-destructive-foreground/10"
        onClick={handleDismiss}
        aria-label="Dismiss error"
      >
        <X className="size-4" />
      </Button>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="assertive">
        Upload error:{" "}
        {getErrorMessage(error) || "There was an error uploading your files."}
        {rejectedFiles.length > 0 &&
          ` ${rejectedFiles.length} files were rejected.`}
      </div>
    </Alert>
  );
}
