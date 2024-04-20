"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/LimitedOffers/LimitedOffersColumns";

const LimitedOffersPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<LimitedOffersType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/limited_offers", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Limited Offers</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/LimitedOffers/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Offers
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default LimitedOffersPage;
