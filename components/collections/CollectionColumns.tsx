"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) =>
      <Link href={`/categories/${row.original.categories.map((category) => category._id)}`}>{row.original.categories.map((category) => category.title).join(", ")}</Link>
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image[0]}
        width={200}
        height={200}
        alt="image"
      ></Image>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
