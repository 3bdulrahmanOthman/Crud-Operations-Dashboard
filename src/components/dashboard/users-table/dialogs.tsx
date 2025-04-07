import { DataTableDeleteDialog } from "@/components/data-table";
import { UserProps } from "@/types";
import React from "react";
import { useDialogStore } from "@/store/dialogs";
import { ManageDataEntries } from "./manage-row-entries";
import { useUserStore } from "@/store/users";

export function Dialogs() {
  const { open, data, close } = useDialogStore();
  const { deleteUser, updateUser, addUser, isLoading } = useUserStore();

  if (!open) return null;

  return (
    <>
      <ManageDataEntries
        open={open === "edit" || open === "add"}
        onOpenChange={close}
        user={data || undefined}
        loading={isLoading}
        onAction={async (values) => {
          if (open === "edit" && data) {
            await updateUser({ ...data, ...values });
          } else {
            await addUser(values);
          }
        }}
      />

      {data && (
        <DataTableDeleteDialog<UserProps>
          label="User"
          identifierKey="name"
          key={`delete-${data.id}`}
          open={open === "delete"}
          onOpenChange={close}
          row={data}
          onDelete={async () => {
            await deleteUser(data.id);
            close();
          }}
        />
      )}
    </>
  );
}
