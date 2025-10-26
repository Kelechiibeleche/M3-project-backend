// routes/category.routes.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category.model");

// GET all categories (for dropdowns)
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

module.exports = router;
