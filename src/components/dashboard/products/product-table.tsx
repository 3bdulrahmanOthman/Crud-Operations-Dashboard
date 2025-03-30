"use client";

import { Button } from "@/components/ui/button";
import {
  DataTable,
  DataTableSkeleton,
  DataTableToolbar,
} from "@/components/data-table";
import { exportTableToCSV } from "@/lib/export";
import { ProductColumns } from "./product-table-columns";
import { memo, useEffect, useMemo } from "react";
import { Icons } from "@/components/icons";
import { useProductStore } from "@/store/products";
import { ProductDialogs } from "./product-table-dialogs";
import { useDialogStore } from "@/store/dialogs";

export const ProductsTable = memo(() => {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productCategoryOptions = useMemo(() => {
    const categoryMap = new Map<string, { label: string; value: string }>();

    products.forEach((product) => {
      if (product.category) {
        const { id, name } = product.category;
        if (!categoryMap.has(id)) {
          categoryMap.set(id, { label: name, value: name });
        }
      }
    });

    return Array.from(categoryMap.values());
  }, [products]);

  if (isLoading) {
    return <DataTableSkeleton columnCount={6} />;
  }

  return (
    <>
      <DataTable
        columns={ProductColumns}
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
                  options: productCategoryOptions,
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
      <ProductDialogs />
    </>
  );
});

ProductsTable.displayName = "ProductsTable";
