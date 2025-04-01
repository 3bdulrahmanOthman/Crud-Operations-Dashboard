"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { ProductProps } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";
import LongText from "@/components/long-text";
import Image from "next/image";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Image
          src={row.original.images[0] || "/placeholder.svg"}
          alt={row.getValue("title")}
          width={32}
          height={32}
          className="w-8 h-8 rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=80&width=80"
          }}
        />
        <LongText className="max-w-32">{row.getValue("title")}</LongText>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-24">{row.getValue("description")}</LongText>
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <span className="text-gray-600 dark:text-gray-300">
        {row.original.category?.name}
      </span>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.original.category?.id.toString());
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">{formatPrice(row.getValue("price"))}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (formatDate(row.getValue("createdAt")));
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      return formatDate(row.getValue("updatedAt"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return <RowActions product={product} />;
    },
  },
];
