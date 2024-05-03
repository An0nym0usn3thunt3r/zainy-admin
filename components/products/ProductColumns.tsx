"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "categories",
    header: "categories",
    cell: ({ row }) =>row.original.categories.length > 0 ? 
    <Link href={"/categories/" + row.original.categories.map((category) => category._id)}>
      {row.original.categories.map((category) => category.title).join(", ")}
    </Link>
     : "-",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => row.original.collections.length > 0 ? 
    <Link href={"/collections/" + row.original.collections.map((collection) => collection._id)}>
      {row.original.collections.map((collection) => collection.title).join(", ")}
    </Link>
     : "-",
  },
  {
    accessorKey: "subcollections",
    header: "Sub Collections",
    cell: ({ row }) => row.original.subcollections.length > 0 ? 
    <Link href={"/sub_collections/" + row.original.subcollections.map((scollection) => scollection._id)}>
      {row.original.subcollections.map((scollection) => scollection.title).join(", ")}
    </Link>
     : "-",
  },
  {
    accessorKey: "price",
    header: "Price (AED)",
  },
  {
    accessorKey: "discount",
    header: "Discount (AED)",
  },
  {
    accessorKey: "Image",
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
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
