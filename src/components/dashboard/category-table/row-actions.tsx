import { DataTableActions } from "@/components/data-table";
import { useDialogStore } from "@/store/dialogs";
import { CategoryProps } from "@/types";
import { toast } from "sonner";

export const RowActions = ({ data }: { data: CategoryProps }) => {
  const { setOpen } = useDialogStore();
    const options = [
      {
        label: "Copy Category ID",
        icon: "clipboard",
        onClick: () => {
          navigator.clipboard.writeText(String(data.id));
          toast.success("Category ID copied to clipboard");
        },
      },
      { separator: true },
      {
        label: "Edit Category",
        icon: "edit",
        onClick: () => {
          setOpen("edit", data);
          console.log("Editing Category", data.id)},
      },
      {
        label: "Delete Category",
        icon: "trash",
        iconProps: { className: "text-destructive" },
        className: "!text-destructive",
        onClick: () => {
          setOpen("delete", data);
          console.log("Deleting Category", data.id);
        },
      },
    ];
  
    return <DataTableActions options={options} />;
  };