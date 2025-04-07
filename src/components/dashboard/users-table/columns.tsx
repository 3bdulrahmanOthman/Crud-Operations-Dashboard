"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { UserProps } from "@/types";
import { formatDate, RoleBadge } from "@/lib/utils";
import LongText from "@/components/long-text";
import Image from "next/image";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<UserProps>[] = [
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
          src={row.original.avatar || "/placeholder.svg"}
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-24">{row.getValue("email")}</LongText>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      return <RoleBadge role={row.getValue("role")}/>
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
      const users = row.original;
      return <RowActions data={users} />;
    },
  },
];
