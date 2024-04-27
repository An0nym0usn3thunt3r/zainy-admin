import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  discount: [String],
  price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => {return v ? parseFloat(v.toString()) : 0; }},
  expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return v ? parseFloat(v.toString()) : 0; }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;