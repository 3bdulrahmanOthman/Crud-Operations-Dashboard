import { DataTableDeleteDialog } from "@/components/data-table";
import { ProductProps } from "@/types";
import { slugify } from "@/lib/utils";
import { ProductManageDialog } from "./product-table-manage-dialog";
import ProductViewModal from "./product-table-model.dialog";
import React from "react";
import { useDialogStore } from "@/store/dialogs";
import { useProductStore } from "@/store/products";

export function ProductDialogs() {
  const { open, data, close, setOpen } = useDialogStore();
  const { deleteProduct, updateProduct, addProduct } = useProductStore();

  if(!open) return null;
  
  return (
    <>
      <ProductManageDialog
        open={open === "edit" || open === "add"}
        onOpenChange={close}
        product={data || undefined}
        onAction={async (values) => {
          if (open === "edit" && data) {
            await updateProduct({ ...data, ...values });
          } else {
            await addProduct({
              ...values,
              categoryId: values.categoryId.toString(),
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
