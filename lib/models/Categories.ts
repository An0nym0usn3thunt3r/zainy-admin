import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

const Categories =mongoose.models.Categories || mongoose.model("Categories", CategoriesSchema);

export default Categories;