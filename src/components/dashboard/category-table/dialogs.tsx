import { DataTableDeleteDialog } from "@/components/data-table";
import { CategoryProps } from "@/types";
import React from "react";
import { useDialogStore } from "@/store/dialogs";
import { useCategoryStore } from "@/store/categories";
import { ManageCategoryEntry } from "./manage-row-entries";

export function Dialogs() {
  const { open, data, close } = useDialogStore();
  const { deleteCategory, updateCategory, addCategory, isLoading } = useCategoryStore();

  if (!open) return null;

  return (
    <>
      <ManageCategoryEntry
        open={open === "edit" || open === "add"}
        onOpenChange={close}
        category={data || undefined}
        loading={isLoading}
        onAction={async (values) => {
          if (open === "edit" && data) {
            await updateCategory(data.id, { 
              name: values.name,
              image: values.image?.[0] || "",
             });
          } else {
            await addCategory({
              name: values.name,
              image: values.image?.[0] || "",
            });
          }
        }}
      />

      {data && (
        <DataTableDeleteDialog<CategoryProps>
          label="Category"
          identifierKey="name"
          key={`delete-${data.id}`}
          open={open === "delete"}
          onOpenChange={close}
          row={data}
          onDelete={async () => {
            await deleteCategory(data.id);
            close();
          }}
        />
      )}
    </>
  );
}
