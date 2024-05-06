import Categories from "@/lib/models/Categories";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import SubCollection from "@/lib/models/SubCollection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate([
      { path: "categories", model: Categories },
      { path: "collections", model: Collection },
      { path: "subcollections", model: SubCollection },
    ]);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      price,
      discount,
      image,
      collections,
      categories,
      subcollections,
      tags,
      youtube,
      rattings,
      reviews,

      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7,
      color8,
      color9,
      color10,
      color11,
      color12,
      color13,
      color14,
      color15,
      color16,
      color17,
      color18,
      color19,
      color20,

      size1,
      size2,
      size3,
      size4,
      size5,
      size6,
      size7,
      size8,
      size9,
      size10,
      size11,
      size12,
      size13,
      size14,
      size15,
      size16,
      size17,
      size18,
      size19,
      size20,

      cp1,
      cp2,
      cp3,
      cp4,
      cp5,
      cp6,
      cp7,
      cp8,
      cp9,
      cp10,
      cp11,
      cp12,
      cp13,
      cp14,
      cp15,
      cp16,
      cp17,
      cp18,
      cp19,
      cp20,

      dp1,
      dp2,
      dp3,
      dp4,
      dp5,
      dp6,
      dp7,
      dp8,
      dp9,
      dp10,
      dp11,
      dp12,
      dp13,
      dp14,
      dp15,
      dp16,
      dp17,
      dp18,
      dp19,
      dp20,

      ci1,
      ci2,
      ci3,
      ci4,
      ci5,
      ci6,
      ci7,
      ci8,
      ci9,
      ci10,
      ci11,
      ci12,
      ci13,
      ci14,
      ci15,
      ci16,
      ci17,
      ci18,
      ci19,
      ci20,
    } = await req.json();

    if (!title) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );
    // included in new data, but not included in the previous data

    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // included in previous data, but not included in the new data

    // Update collections
    await Promise.all([
      // Update added collections with this product
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      // Update removed collections without this product
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        price,
        discount,
        image,
        collections,
        categories,
        subcollections,
        tags,
        youtube,
        rattings,
        reviews,
  
        color1,
        color2,
        color3,
        color4,
        color5,
        color6,
        color7,
        color8,
        color9,
        color10,
        color11,
        color12,
        color13,
        color14,
        color15,
        color16,
        color17,
        color18,
        color19,
        color20,
  
        size1,
        size2,
        size3,
        size4,
        size5,
        size6,
        size7,
        size8,
        size9,
        size10,
        size11,
        size12,
        size13,
        size14,
        size15,
        size16,
        size17,
        size18,
        size19,
        size20,
  
        cp1,
        cp2,
        cp3,
        cp4,
        cp5,
        cp6,
        cp7,
        cp8,
        cp9,
        cp10,
        cp11,
        cp12,
        cp13,
        cp14,
        cp15,
        cp16,
        cp17,
        cp18,
        cp19,
        cp20,
  
        dp1,
        dp2,
        dp3,
        dp4,
        dp5,
        dp6,
        dp7,
        dp8,
        dp9,
        dp10,
        dp11,
        dp12,
        dp13,
        dp14,
        dp15,
        dp16,
        dp17,
        dp18,
        dp19,
        dp20,
  
        ci1,
        ci2,
        ci3,
        ci4,
        ci5,
        ci6,
        ci7,
        ci8,
        ci9,
        ci10,
        ci11,
        ci12,
        ci13,
        ci14,
        ci15,
        ci16,
        ci17,
        ci18,
        ci19,
        ci20,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    // Update collections
    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[productId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

