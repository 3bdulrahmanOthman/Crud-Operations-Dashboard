"use client";

import { Button } from "@/components/ui/button";
import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
} from "@/components/data-table";
import { exportTableToCSV } from "@/lib/export";
import { memo, useEffect } from "react";
import { Icons } from "@/components/icons";
import { useDialogStore } from "@/store/dialogs";
import { columns } from "./columns";
import { Dialogs } from "./dialogs";
import { useUserStore } from "@/store/users";
import { useUniqueOptions } from "@/hooks/useUniqueOptions";
import { UserProps } from "@/types";

export const UsersTable = memo(() => {
  const {
    users,
    fetchUsers,
    isLoading,
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const uniqueRoleOptions = useUniqueOptions<UserProps>(
    users,
    (u) =>
      u?.role
        ? {
            label: u.role.charAt(0).toUpperCase() + u.role.slice(1),
            value: u.role,
            count: users.filter((user) => user.role === u.role).length,
          }
        : null
  );

  if (isLoading) {
    return <DataTableSkeleton columnCount={6} />;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            searchColumns={["name", "email"]}
            filterOptions={[
              {
                id: "role",
                title: "Role",
                options: uniqueRoleOptions,
              },
            ]}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                useDialogStore.getState().setOpen("add");
                console.log("➕ Add user dialog triggered");
              }}
            >
              <Icons.add className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportTableToCSV(table, {
                  filename: "Users",
                  excludeColumns: ["select", "actions"],
                })
              }
            >
              <Icons.download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DataTableToolbar>
        )}
      />
      <Dialogs />
    </>
  );
});

UsersTable.displayName = "UsersTable";
