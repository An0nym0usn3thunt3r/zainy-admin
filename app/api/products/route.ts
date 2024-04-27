import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
import Categories from "@/lib/models/Categories";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      price,
      discount,
      collections,
      categories,
      tags,
      color1,
      color2,
      color3,
      color4,
      color5,
      cp1,
      cp2,
      cp3,
      cp4,
      cp5,
      ci1,
      ci2,
      ci3,
      ci4,
      ci5,
      size1,
      size2,
      size3,
      size4,
      size5,
      sp1,
      sp2,
      sp3,
      sp4,
      sp5,
    } = await req.json();

    if (
      !title ||
      !description ||
      !categories ||
      !price ||
      !color1 ||
      !cp1 ||
      !ci1 ||
      !discount
    ) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      discount,
      collections,
      categories,
      tags,
      color1,
      color2,
      color3,
      color4,
      color5,
      cp1,
      cp2,
      cp3,
      cp4,
      cp5,
      ci1,
      ci2,
      ci3,
      ci4,
      ci5,
      size1,
      size2,
      size3,
      size4,
      size5,
      sp1,
      sp2,
      sp3,
      sp4,
      sp5,
    });

    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    // if (categories) {
    //   for (const categoriesId of categories) {
    //     const category = await Categories.findById(categoriesId);
    //     if (category) {
    //       category.products.push(newProduct._id);
    //       await category.save();
    //     }
    //   }
    // }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate([
        { path: "collections", model: Collection },
        { path: "categories", model: Categories },
      ]);

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
