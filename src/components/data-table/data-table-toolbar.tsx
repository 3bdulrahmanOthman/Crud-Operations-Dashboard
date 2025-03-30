"use client";

import type React from "react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Options } from "@/types";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  title: string;
  options: Options[];
}

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  searchColumn?: string[]; // Supports multiple search columns
  filterOptions?: FilterOption[];
}

export function DataTableToolbar<TData>({
  table,
  searchColumn = ["name"], // Default to "name" column
  filterOptions = [],
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim().toLowerCase();

    // Apply filter to each searchable column
    table.getAllColumns().forEach((column) => {
      if (searchColumn.includes(column.id)) {
        column.setFilterValue(searchValue || undefined);
      }
    });
  };

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 overflow-auto",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search Input (for multiple columns) */}
        {searchColumn.some((col) => table.getColumn(col)) && (
          <Input
            placeholder={`Search ${searchColumn.join(", ")}...`}
            onChange={handleSearchChange}
            className="h-8 w-40 lg:w-64"
          />
        )}

        {/* Dynamic Filters */}
        <div className="flex gap-x-2">
          {filterOptions.map(
            ({ id, title, options }) =>
              table.getColumn(id) && (
                <DataTableFacetedFilter
                  key={id}
                  column={table.getColumn(id)}
                  title={title}
                  options={options}
                />
              )
          )}
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.close className="size-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
