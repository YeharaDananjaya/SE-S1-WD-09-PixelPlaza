const express = require('express');
const router = express.Router();
const Shops = require('../models/Shops');

// Helper function to generate Shop ID in the format Shop001, Shop002, etc.
const generateShopID = async () => {
  const lastShop = await Shops.findOne().sort({ shopID: -1 });
  let newShopID = "Shop001"; // Default value if no shops exist
  if (lastShop) {
    const lastIDNumber = parseInt(lastShop.shopID.replace("Shop", "")); // Extract the number part of the ID
    const newIDNumber = lastIDNumber + 1;
    newShopID = `Shop${newIDNumber.toString().padStart(3, '0')}`; // Ensure the ID has 3 digits
  }
  return newShopID;
};

// Route to add a new shop
router.post("/add", async (req, res) => {
  try {
    const newShopID = await generateShopID(); // Get the new shop ID
    const newShop = new Shops({
      shopID: newShopID,
      floorID: req.body.floorID,
      shopKeeperPhoto: req.body.shopKeeperPhoto,
      shopKeeperName: req.body.shopKeeperName,
      shopName: req.body.shopName,
      assignDate: req.body.assignDate,
      Value: req.body.Value,
      description: req.body.description,
    });

    await newShop.save();
    res.status(201).json({ message: "Shop added successfully", newShop });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ message: "Failed to add shop", error });
  }
});

// Route to get all shops
router.get("/get", async (req, res) => {
  try {
    const shops = await Shops.find();
    res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ message: "Failed to fetch shops", error });
  }
});

// Route to get a single shop by ID
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shops.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Failed to fetch shop", error });
  }
});

// Route to update a shop by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShop = await Shops.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ message: "Shop updated successfully", updatedShop });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ message: "Failed to update shop", error });
  }
});

// Route to delete a shop by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShop = await Shops.findByIdAndDelete(id);
    if (!deletedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ message: "Failed to delete shop", error });
  }
});

module.exports = router;
