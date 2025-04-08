"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { CategoryProps } from "@/types";
import LongText from "@/components/long-text";
import Image from "next/image";
import { RowActions } from "./row-actions";
import React from 'react'


export const columns: ColumnDef<CategoryProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Image
          src={row.original.image || "/placeholder.svg"}
          alt={row.getValue("name")}
          width={32}
          height={32}
          className="w-8 h-8 rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=80&width=80"
          }}
        />
        <LongText className="max-w-32">{row.getValue("name")}</LongText>
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-24">{row.getValue("slug")}</LongText>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const categories = row.original;
      return <RowActions data={categories} />;
    },
  },
];
