"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<SubCollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/sub_collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "categories",
    header: "categories",
    cell: ({ row }) => row.original.categories.length > 0 ? row.original.categories.map((category) => category.title).join(", ") : "-",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => row.original.collections.length > 0 ? row.original.collections.map((collection) => collection.title).join(", ") : "-",
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
    cell: ({ row }) => <Delete item="sub_collection" id={row.original._id} />,
  },
];
