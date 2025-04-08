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
import { useCategoryStore } from "@/store/categories";

export const CategoriesTable = memo(() => {
  const { categories, fetchCategories, isLoading } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) {
    return <DataTableSkeleton columnCount={4} />;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            searchColumns={["name", "slug"]}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                useDialogStore.getState().setOpen("add");
                console.log("Add dialog opened");
              }}
            >
              <Icons.add />
              Add
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportTableToCSV(table, {
                  filename: "Categories",
                  excludeColumns: ["select", "actions"],
                })
              }
            >
              <Icons.download />
              Export
            </Button>
          </DataTableToolbar>
        )}
      />
      <Dialogs />
    </>
  );
});

CategoriesTable.displayName = "CategoriesTable";