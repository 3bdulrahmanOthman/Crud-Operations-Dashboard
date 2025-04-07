import { DataTableActions } from "@/components/data-table";
import { useDialogStore } from "@/store/dialogs";
import { UserProps } from "@/types";
import { toast } from "sonner";

export const RowActions = ({ data }: { data: UserProps }) => {
  const { setOpen } = useDialogStore();
    const options = [
      {
        label: "Copy User ID",
        icon: "clipboard",
        onClick: () => {
          navigator.clipboard.writeText(data.id);
          toast.success("User ID copied to clipboard");
        },
      },
      { separator: true },
      {
        label: "Edit User",
        icon: "edit",
        onClick: () => {
          setOpen("edit", data);
          console.log("Editing User", data.id)},
      },
      {
        label: "Delete User",
        icon: "trash",
        iconProps: { className: "text-destructive" },
        className: "!text-destructive",
        onClick: () => {
          setOpen("delete", data);
          console.log("Deleting User", data.id);
        },
      },
    ];
  
    return <DataTableActions options={options} />;
  };