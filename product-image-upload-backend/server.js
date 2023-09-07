import express from "express";
import connectDB from "./db.js";
import Product from "./models/productModel.js";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {config} from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up database connection with mongoose
// Connect with MongoDB
connectDB();

const storage = multer.diskStorage({
  destination: "uploads/", // Specify the destination folder for uploaded files
  filename: (req, file, cb) => {
    // Define the filename logic here (you can customize it)
    cb(null, file.originalname); // This uses the original filename
  },
});

// Set up Multer for file upload (use disk storage)
const upload = multer({storage});

// Add a route to fetch products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database

    res.status(200).json({products});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to fetch products"});
  }
});

// Define a route to handle image uploads and product creation

app.post("/api/products", upload.array("images", 3), async (req, res) => {
  try {
    const imageUrls = [];

    // Upload images to Cloudinary and collect URLs
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "product-images",
      });
      imageUrls.push(result.secure_url);
    }

    // Create a new product with all details
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: imageUrls,
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({message: "Product created successfully", product: newProduct});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Product creation failed"});
  }
});

// Add a route to fetch a product by productId
app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId); // Use "productId" here

    if (!product) {
      return res.status(404).json({error: "Product not found"});
    }

    res.status(200).json({product});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to fetch product"});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
