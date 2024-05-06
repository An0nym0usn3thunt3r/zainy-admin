import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Categories from "@/lib/models/Categories";

export const GET = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    await connectToDB();

    const CategoriesModal = await Categories.findById(params.categoriesId)

    if (!CategoriesModal) {
      return new NextResponse(
        JSON.stringify({ message: "Categories not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(CategoriesModal, { status: 200 });
  } catch (err) {
    console.log("[categoriesId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let CategoriesModal = await Categories.findById(params.categoriesId);

    if (!CategoriesModal) {
      return new NextResponse("Categories not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    CategoriesModal = await Categories.findByIdAndUpdate(
      params.categoriesId,
      { title, description, image },
      { new: true }
    );

    await CategoriesModal.save();

    return NextResponse.json(CategoriesModal, { status: 200 });
  } catch (err) {
    console.log("[categoriesId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Categories.findByIdAndDelete(params.categoriesId);
    
    return new NextResponse("Categories is deleted", { status: 200 });
  } catch (err) {
    console.log("[categoriesId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
