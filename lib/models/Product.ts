import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: Number,
    discount: Number,
    image: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    subcollections: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCollection" }],
    tags: [String],
    color1: String,
    color2: String,
    color3: String,
    color4: String,
    color5: String,
    cp1: Number,
    cp2: Number,
    cp3: Number,
    cp4: Number,
    cp5: Number,
    ci1: [String],
    ci2: [String],
    ci3: [String],
    ci4: [String],
    ci5: [String],
    size1: String,
    size2: String,
    size3: String,
    size4: String,
    size5: String,
    sp1: Number,
    sp2: Number,
    sp3: Number,
    sp4: Number,
    sp5: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true } }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
