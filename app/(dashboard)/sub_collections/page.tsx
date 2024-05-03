"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/sub_collections/SubCollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [subCollections, setsubCollections] = useState([]);

  const getsubCollections = async () => {
    try {
      const res = await fetch("/api/sub_collections", {
        method: "GET",
      });
      const data = await res.json();
      setsubCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[sub_collections_GET]", err);
    }
  };

  useEffect(()=>{
    console.log("subCollections")
    console.log(subCollections)
  }, [subCollections]);

  useEffect(() => {
    getsubCollections();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">
          Sub Collection
          </p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/sub_collections/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Sub Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={subCollections} searchKey="title" />
    </div>
  );
};

export default Collections;
