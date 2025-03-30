"use client"

import * as React from "react"
import { type Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"

interface DataTableExpandableButtonProps<TData> {
  row: Row<TData>
  className?: string
  canExpand?: boolean
}

export function DataTableExpandableButton<TData>({
  row,
  className,
  canExpand,
}: DataTableExpandableButtonProps<TData>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "transition-all duration-200",
        className,
        !canExpand && "invisible"
      )}
      disabled={!canExpand}
      onClick={(e) => {
        e.stopPropagation()
        row.toggleExpanded()
      }}
      aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
    >
      <Icons.chevronRight className={cn("size-4", row.getIsExpanded() ? "rotate-90" : "")} />
    </Button>
  )
}