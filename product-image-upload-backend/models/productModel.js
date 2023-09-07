// Define a product schema (modify as needed)
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: [String],
  },
  {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
