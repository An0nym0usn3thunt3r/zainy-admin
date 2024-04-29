import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Categories from "@/lib/models/Categories";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { title, description, image } = await req.json()
    const existingCategories = await Categories.findOne({ title })

    if (existingCategories) {
      return new NextResponse("Categories already exists", { status: 400 })
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 })
    }

    console.log("all right")

    const newCategories = await Categories.create({
      title,
      description,
      image,
    })

    console.log(newCategories)

    await newCategories.save()
    console.log("done")

    return NextResponse.json(newCategories, { status: 200 })
  } catch (err) {
    console.log("[Categoriess_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const categories = await Categories.find()
    console.log(categories)

    return NextResponse.json(categories, { status: 200 })
  } catch (err) {
    console.log("[categories_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
