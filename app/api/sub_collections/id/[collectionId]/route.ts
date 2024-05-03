  import { NextRequest, NextResponse } from "next/server";
  import { auth } from "@clerk/nextjs";

  import { connectToDB } from "@/lib/mongoDB";
  import SubCollection from "@/lib/models/SubCollection";
  import { ObjectId } from 'mongodb';

  export const GET = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
  ) => {
    try {
      await connectToDB();


      const collection = await SubCollection.find({
        collections: new ObjectId(params.collectionId)
      })
      if (!collection) {
        return new NextResponse(
          JSON.stringify({ message: "Collection not found" }),
          { status: 404 }
        );
      }

      return NextResponse.json(collection, { status: 200 });
    } catch (err) {
      console.log("[collectionId_GET]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export const dynamic = "force-dynamic";
