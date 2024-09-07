const express = require("express");
const router = express.Router();
const Sales = require("../models/Sales");

// Create a new sale
router.post("/", async (req, res) => {
  try {
    const sale = new Sales(req.body);
    await sale.save();
    res.status(201).json({ message: "Sale created successfully", sale });
  } catch (error) {
    console.error("Failed to create sale:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create sale", error: error.message });
  }
});

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find();
    res.status(200).json(sales);
  } catch (error) {
    console.error("Failed to fetch sales:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch sales", error: error.message });
  }
});

// Update a sale
router.put("/:id", async (req, res) => {
  try {
    const updatedSale = await Sales.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json({
      message: "Sale updated successfully",
      sale: updatedSale,
    });
  } catch (error) {
    console.error("Failed to update sale:", error.message);
    res
      .status(400)
      .json({ message: "Failed to update sale", error: error.message });
  }
});

// Delete a sale
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Failed to delete sale:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete sale", error: error.message });
  }
});

module.exports = router;
