import { FC, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatBytes } from "@/lib/utils";
import { Icons } from "./icons";

interface FileCardProps {
  file: File & Partial<{ preview: string }>;
  onRemove: () => void;
  progress?: number;
}

const FileCard: FC<FileCardProps> = memo(({ file, progress, onRemove }) => {
  return (
    <div className="relative flex items-center space-x-4">
      <div className="flex flex-1 space-x-4">
        {typeof file.preview === "string" && (
          <Image
            src={file.preview!}
            alt={file.name}
            width={48}
            height={48}
            loading="lazy"
            className="aspect-square shrink-0 rounded-md object-cover"
          />
        )}
        <div className="flex w-full flex-col gap-2">
          <div className="space-y-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          {progress !== undefined && <Progress value={progress} />}
        </div>
      </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 text-destructive"
          onClick={onRemove}
        >
          <Icons.trash className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
    </div>
  );
});

FileCard.displayName = "FileCard";

export default FileCard;
