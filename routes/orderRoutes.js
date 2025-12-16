import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const router = express.Router();

// Create order from cart
router.post("/", async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    items: cart.items,
    totalPrice
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

// Get user orders
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ user: req.params.userId });
  res.json(orders);
});

export default router;
