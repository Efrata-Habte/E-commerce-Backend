import express from "express";
import Product from "./models/Product.js";

const router = express.Router();

// Create product
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Update product
router.patch("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
