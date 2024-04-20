import Blog from "@/lib/models/Blog";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { title, description1, description2, description3 , image } = await req.json()

    const existingBlog = await Blog.findOne({ title })

    if (existingBlog) {
      return new NextResponse("Blog already exists", { status: 400 })
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 })
    }

    const newCollection = await Blog.create({
      title,
      description1,
      description2,
      description3,
      image,
    })

    await newCollection.save()

    return NextResponse.json(newCollection, { status: 200 })
  } catch (err) {
    console.log("[collections_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const blogs = await Blog.find().sort({ createdAt: "desc" })

    return NextResponse.json(blogs, { status: 200 })
  } catch (err) {
    console.log("[collections_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
