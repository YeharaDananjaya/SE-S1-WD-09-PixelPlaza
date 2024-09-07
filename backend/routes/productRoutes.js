const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Promotion = require("../models/Promotion"); // Assuming you have a Promotion model

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Failed to create product:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create product", error: error.message });
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Failed to update product:", error.message);
    res
      .status(400)
      .json({ message: "Failed to update product", error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
});

// Apply a promotion to a product
router.put("/applyPromotion/:id", async (req, res) => {
  const { promotionId } = req.body;

  try {
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Save original price if not already saved
    if (product.originalPrice === undefined) {
      product.originalPrice = product.price;
    }

    // Update product fields for promotion
    product.promotionApplied = true;
    product.promotionId = promotionId;
    const discountedPrice =
      product.originalPrice * (1 - promotion.discount / 100);
    product.price = discountedPrice;
    product.promotionEndDate = promotion.endDate;

    await product.save();

    res.status(200).json({
      message: "Promotion applied successfully",
      product,
    });
  } catch (error) {
    console.error("Failed to apply promotion:", error.message);
    res
      .status(500)
      .json({ message: "Failed to apply promotion", error: error.message });
  }
});

// Remove a promotion from a product
router.put("/removePromotion/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Revert to original price if promotion is removed
    if (product.originalPrice !== undefined) {
      product.price = product.originalPrice;
      product.originalPrice = undefined; // Remove the field
      product.promotionEndDate = undefined;
    }

    product.promotionApplied = false;
    product.promotionId = "";

    await product.save();

    res.status(200).json({
      message: "Promotion removed successfully",
      product,
    });
  } catch (error) {
    console.error("Failed to remove promotion:", error.message);
    res
      .status(500)
      .json({ message: "Failed to remove promotion", error: error.message });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Failed to delete product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
});

// Revert product price if promotion expired
const checkPromotionExpiryAndRevert = async () => {
  try {
    const products = await Product.find({
      promotionEndDate: { $lte: new Date() },
      promotionApplied: true,
      originalPrice: { $exists: true },
    });

    products.forEach(async (product) => {
      product.price = product.originalPrice;
      product.originalPrice = undefined; // Remove the field
      product.promotionApplied = false;
      product.promotionId = "";
      product.promotionEndDate = undefined;
      await product.save();
    });
  } catch (error) {
    console.error("Failed to revert product prices:", error.message);
  }
};

// Schedule the check for promotion expiry (e.g., every day)
setInterval(checkPromotionExpiryAndRevert, 24 * 60 * 60 * 1000); // Check daily

module.exports = router;
