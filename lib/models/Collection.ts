import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: [String],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const   Collection =mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;