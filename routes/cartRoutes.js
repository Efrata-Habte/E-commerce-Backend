import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Login (simple)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    userId: user._id
  });
});

export default router;
