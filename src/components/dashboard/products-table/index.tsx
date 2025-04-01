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
import { useProductStore } from "@/store/products";
import { useDialogStore } from "@/store/dialogs";
import { columns } from "./columns";
import { Dialogs } from "./dialogs";
import { useCategoryStore } from "@/store/categories";
import { CategoryProps } from "@/types";
import { useUniqueOptions } from "@/hooks/useUniqueOptions";

export const ProductsTable = memo(() => {
  const {
    products,
    fetchProducts,
    isLoading,
    productsByCategory,
    fetchProductsByCategory,
  } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchCategories, fetchProducts]);

  useEffect(() => {
    categories.forEach((category) => {
      fetchProductsByCategory(category.id);
    });
  }, [categories, fetchProductsByCategory]);

  const uniqueCategoryOptions = useUniqueOptions<CategoryProps>(
    categories,
    (c: CategoryProps) =>
      c
        ? {
            label: c.name,
            value: c.id.toString(),
            count: productsByCategory[c.id]?.length || 0,
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
        data={products}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            searchColumn={["title", "description"]}
            filterOptions={
              products && [
                {
                  id: "category",
                  title: "Category",
                  options: uniqueCategoryOptions,
                },
              ]
            }
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
                  filename: "Products",
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

ProductsTable.displayName = "ProductsTable";
