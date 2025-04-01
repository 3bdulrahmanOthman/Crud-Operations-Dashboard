  import { DataTableDeleteDialog } from "@/components/data-table";
  import { ProductProps } from "@/types";
  import { slugify } from "@/lib/utils";
  import ProductViewModal from "./view-model";
  import React from "react";
  import { useDialogStore } from "@/store/dialogs";
  import { useProductStore } from "@/store/products";
  import { ManageDataEntries } from "./manage-row-entries";
  import { useCategoryStore } from "@/store/categories";

  export function Dialogs() {
    const { open, data, close, setOpen } = useDialogStore();
    const { deleteProduct, updateProduct, addProduct } = useProductStore();
    const { categories } = useCategoryStore();

    if (!open) return null;

    return (
      <>
        <ManageDataEntries
          open={open === "edit" || open === "add"}
          onOpenChange={close}
          product={data || undefined}
          categories={categories || undefined}
          onAction={async (values) => {
            if (open === "edit" && data) {
              await updateProduct({ ...data, ...values });
            } else {
              await addProduct({
                ...values,
                slug: slugify(values.title),
              });
            }
          }}
        />

        {data && (
          <React.Fragment>
            <DataTableDeleteDialog<ProductProps>
              label="Product"
              identifierKey="title"
              key={`delete-${data.id}`}
              open={open === "delete"}
              onOpenChange={close}
              row={data}
              onDelete={async () => {
                await deleteProduct(data.id);
                close();
              }}
            />
            <ProductViewModal
              open={open === "view"}
              onOpenChange={close}
              product={data || undefined}
              onClose={close}
              onEdit={() => setOpen("edit", data)}
              onDelete={() => setOpen("delete", data)}
            />
          </React.Fragment>
        )}
      </>
    );
  }
