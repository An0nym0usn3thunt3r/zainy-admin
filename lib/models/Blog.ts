import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description1: String,
  description2: String,
  description3: String,
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const Blog =mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;