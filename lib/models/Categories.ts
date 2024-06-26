import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const Categories =mongoose.models.Categories || mongoose.model("Categories", CategoriesSchema);

export default Categories;