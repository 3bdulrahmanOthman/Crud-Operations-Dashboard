"use client";

import { SelectIcon } from "@radix-ui/react-select";
import type { Column } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const noneValue = `${column.id}-none`;
  const ascValue = `${column.id}-asc`;
  const descValue = `${column.id}-desc`;
  const hideValue = `${column.id}-hide`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select
        value={
          column.getIsSorted() === "desc"
            ? descValue
            : column.getIsSorted() === "asc"
              ? ascValue
              : noneValue
        }
        onValueChange={(value) => {
          if (value === ascValue) column.toggleSorting(false);
          else if (value === descValue) column.toggleSorting(true);
          else if (value === hideValue) column.toggleVisibility(false);
          else if (value === noneValue) column.clearSorting();
        }}
      >
        <SelectTrigger
          aria-label={
            column.getIsSorted() === "desc"
              ? "Sorted descending. Click to sort ascending."
              : column.getIsSorted() === "asc"
                ? "Sorted ascending. Click to sort descending."
                : "Not sorted. Click to sort ascending."
          }
          className="-ml-3 h-8 w-fit border-none text-xs data-[state=open]:bg-accent [&>svg:last-child]:hidden"
        >
          {title}
          <SelectIcon asChild>
            {column.getCanSort() && column.getIsSorted() === "desc" ? (
              <Icons.sortDesc className="ml-2.5 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <Icons.sortAsc className="ml-2.5 size-4" aria-hidden="true" />
            ) : (
              <Icons.chevronsUpDown className="ml-2.5 size-4" aria-hidden="true" />
            )}
          </SelectIcon>
        </SelectTrigger>
        <SelectContent align="start">
          {column.getCanSort() && (
            <>
              <SelectItem value={ascValue}>
                <span className="flex items-center">
                  <Icons.sortAsc
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Asc
                </span>
              </SelectItem>
              <SelectItem value={descValue}>
                <span className="flex items-center">
                  <Icons.sortDesc
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Desc
                </span>
              </SelectItem>
              <SelectItem value={noneValue}>
                <span className="flex items-center gap-2">
                  <Icons.close 
                    className="size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Reset
                </span>
              </SelectItem>
            </>
          )}
          <SelectSeparator />
          {column.getCanHide() && (
            <SelectItem value={hideValue}>
              <span className="flex items-center">
                <Icons.eyeOff
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Hide
              </span>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}