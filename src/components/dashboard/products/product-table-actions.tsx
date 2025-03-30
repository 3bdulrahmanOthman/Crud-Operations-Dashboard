import { DataTableActions } from "@/components/data-table";
import { useDialogStore } from "@/store/dialogs";
import { ProductProps } from "@/types";
import { toast } from "sonner";

export const ProductActions = ({ product }: { product: ProductProps }) => {
  const { setOpen } = useDialogStore();
    const options = [
      {
        label: "Copy Product ID",
        icon: "clipboard",
        onClick: () => {
          navigator.clipboard.writeText(product.id);
          toast.success("Product ID copied to clipboard");
        },
      },
      { separator: true },
      {
        label: "View Product",
        icon: "eye",
        onClick: () => {
          setOpen("view", product);
          console.log("Viewing product", product.id)
        }
      },
      {
        label: "Edit Product",
        icon: "edit",
        onClick: () => {
          setOpen("edit", product);
          console.log("Editing product", product.id)},
      },
      {
        label: "Delete Product",
        icon: "trash",
        iconProps: { className: "text-destructive" },
        className: "!text-destructive",
        onClick: () => {
          setOpen("delete", product);
          console.log("Deleting product", product.id);
        },
      },
    ];
  
    return <DataTableActions options={options} />;
  };