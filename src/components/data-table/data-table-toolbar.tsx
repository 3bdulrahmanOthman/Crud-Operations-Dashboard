"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import React, { useCallback, useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Options } from "@/types";

interface FilterOption {
  id: string;
  title: string;
  options: Options[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumns?: string[]; 
  filterOptions?: FilterOption[]; 
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchColumns = [],
  filterOptions = [],
  children,
}: DataTableToolbarProps<TData>) {
  const [searchTerm, setSearchTerm] = useState("");
  const isFiltered = table.getState().globalFilter || table.getState().columnFilters.length > 0;

  const onReset = useCallback(() => {
    setSearchTerm("");
    table.setGlobalFilter(undefined);
    table.resetColumnFilters();
  }, [table]);

  const onSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    table.setGlobalFilter(value);
  }, [table]);
  

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {/* Multi-Column Search Input */}
        {searchColumns.length > 0 && (
          <Input
            placeholder={`Search ${searchColumns.join(", ")}`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
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
            onClick={onReset}
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
