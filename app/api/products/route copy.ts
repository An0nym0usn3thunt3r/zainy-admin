// import { auth } from "@clerk/nextjs";
// import { NextRequest, NextResponse } from "next/server";

// import { connectToDB } from "@/lib/mongoDB";
// import Product from "@/lib/models/Product";
// import Collection from "@/lib/models/Collection";
// import Categories from "@/lib/models/Categories";

// export const POST = async (req: NextRequest) => {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     await connectToDB();

//     const {
//       title,
//       description,
//       media,
//       categories,
//       collections,
//       tags,
//       sizes,
//       colors,
//       price,
//       discount,
//     } = await req.json();

//     if (!title || !description || !media || !categories || !price || !discount) {
//       return new NextResponse("Not enough data to create a product", {
//         status: 400,
//       });
//     }

//     const newProduct = await Product.create({
//       title,
//       description,
//       media,
//       categories,
//       collections,
//       tags,
//       sizes,
//       colors,
//       price,
//       discount,
//     });

//     await newProduct.save();

//     if (collections) {
//       for (const collectionId of collections) {
//         const collection = await Collection.findById(collectionId);
//         if (collection) {
//           collection.products.push(newProduct._id);
//           await collection.save();
//         }
//       }
//     }

//     // if (categories) {
//     //   for (const categoriesId of categories) {
//     //     const category = await Categories.findById(categoriesId);
//     //     if (category) {
//     //       category.products.push(newProduct._id);
//     //       await category.save();
//     //     }
//     //   }
//     // }

//     return NextResponse.json(newProduct, { status: 200 });
//   } catch (err) {
//     console.log("[products_POST]", err);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// };

// export const GET = async (req: NextRequest) => {
//   try {
//     await connectToDB();

//     const products = await Product.find()
//       .sort({ createdAt: "desc" })
//       .populate([
//         { path: "collections", model: Collection },
//         { path: "categories", model: Categories }
//       ]);

//     return NextResponse.json(products, { status: 200 });
//   } catch (err) {
//     console.log("[products_GET]", err);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// };

// export const dynamic = "force-dynamic";

