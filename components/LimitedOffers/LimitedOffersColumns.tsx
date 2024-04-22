"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<LimitedOffersType>[] = [
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      <Link href={row.original.link}>{row.original.link}</Link>,
  },
  {
    accessorKey: "Image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        width={200}
        height={200}
        alt="image"
      ></Image>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="specialoffer" id={row.original._id} />,
  },
];
