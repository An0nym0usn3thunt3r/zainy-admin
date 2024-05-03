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
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const SubCollection = mongoose.models.SubCollection || mongoose.model("SubCollection", collectionSchema);

export default SubCollection;
