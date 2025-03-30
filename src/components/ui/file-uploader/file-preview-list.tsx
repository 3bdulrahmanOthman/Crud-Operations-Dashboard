"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFileUploaderStore } from "@/store/file-uploader";
import { Icons } from "@/components/icons";

interface FilePreviewListProps {
  className?: string;
  disabled?: boolean;
  onChange?: (urls: string[]) => void;
}

export function FilePreviewList({
  className,
  disabled = false,
  onChange,
}: FilePreviewListProps) {
  const { uploadedUrls, removeFile} =
    useFileUploaderStore();

  if (uploadedUrls.length === 0) {
    return null;
  }

  const handleRemove = (url: string) => {
    if (disabled) return;
    removeFile(url);

    if (onChange) {
      const newUrls = uploadedUrls.filter((u) => u !== url);
      onChange(newUrls);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {uploadedUrls.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className="relative flex items-center space-x-4"
        >
          <div className="flex flex-1 space-x-4">
            <Image
              src={url || "/placeholder.svg"}
              alt={`Uploaded image ${index + 1}`}
              width={48}
              height={48}
              loading="lazy"
              className="aspect-square shrink-0 rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=100&width=100";
              }}
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "size-7 text-destructive",
              disabled ?? "cursor-not-allowed"
            )}
            onClick={() => handleRemove(url)}
            disabled={disabled}
            aria-label={`Remove image ${index + 1}`}
          >
            <Icons.trash className="size-4" aria-hidden="true" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
