"use client";

import { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface DataTableDeleteDialogProps<TData> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
  row: TData;
  label?: string;
  identifierKey?: keyof TData;
}

export function DataTableDeleteDialog<TData>({
  open,
  onOpenChange,
  onDelete,
  row,
  label = "Record",
  identifierKey = "id" as keyof TData,
}: DataTableDeleteDialogProps<TData>) {
  const [value, setValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const identifier = useMemo(
    () => String(row[identifierKey]),
    [row, identifierKey]
  );

  const handleDelete = useCallback(async () => {
    if (value.trim() !== identifier) {
      toast.error(`Incorrect confirmation. Please enter "${identifier}".`);
      return;
    }

    setIsDeleting(true);
    toast.promise(
      onDelete()
        .then(() => onOpenChange(false))
        .catch((error) => {
          console.error("Delete failed:", error);
          toast.error(`Failed to delete ${label}`);
        })
        .finally(() => setIsDeleting(false)),
      {
        loading: `Deleting ${label}...`,
        success: `${label} deleted successfully.`,
        error: `Failed to delete ${label}.`,
      }
    );
  }, [value, identifier, onDelete, label, onOpenChange]);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== identifier || isDeleting}
      title={
        <span className="text-destructive">
          <Icons.triangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />
          Delete {label}
        </span>
      }
      desc={
        <div className="space-y-4">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-bold">{identifier}</span>?
            <br />
            This action <strong>cannot be undone</strong>.
          </p>

          <Label>
            To confirm, please enter the {label} {String(identifierKey)}{" "}
            <strong>&quot;{identifier}&quot;</strong> below:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter ${identifier} to confirm`}
              disabled={isDeleting}
            />
          </Label>

          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={isDeleting ? "Deleting..." : "Delete"}
      destructive
    />
  );
}
