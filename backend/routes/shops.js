const express = require("express");
const router = express.Router();
const Shops = require("../models/Shops");

// Route to add only the floorID
router.post("/addFloorID", async (req, res) => {
  try {
    const newFloorID = req.body.floorID; // Get floorID from the request body

    // Check if a shop with this floorID already exists
    const existingShop = await Shops.findOne({ floorID: newFloorID });
    if (existingShop) {
      return res.status(400).json({ message: "Shop with this floorID already exists" });
    }

    const newShop = new Shops({
      floorID: newFloorID, // Set floorID from request
    });

    await newShop.save();
    res.status(201).json({ message: "Floor ID added successfully", newShop });
  } catch (error) {
    console.error("Error adding floor ID:", error);
    res.status(500).json({ message: "Failed to add floor ID", error });
  }
});

// Route to update other shop details after the floorID has been set
router.put("/updateDetails/:floorID", async (req, res) => {
  try {
    const { floorID } = req.params; // Get the floorID from the request params

    // Check if the shop with this floorID exists
    const shop = await Shops.findOne({ floorID: floorID });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Update other details
    shop.shopKeeperName = req.body.shopKeeperName;
    shop.shopName = req.body.shopName;
    shop.assignDate = req.body.assignDate;
    shop.Value = req.body.Value;
    shop.description = req.body.description; // Optional, as it's also updated in the next route

    await shop.save();

    res.status(200).json({ message: "Shop details updated successfully", shop });
  } catch (error) {
    console.error("Error updating shop details:", error);
    res.status(500).json({ message: "Failed to update shop details", error });
  }
});


// Route to add or update shopkeeper image and description
router.put("/updateShopkeeper/:floorID", async (req, res) => {
  try {
    const { floorID } = req.params; // Get the floorID from the request params

    // Find the shop with this floorID
    const shop = await Shops.findOne({ floorID: floorID });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Update shopkeeper details
    shop.shopKeeperPhoto = req.body.shopKeeperPhoto || shop.shopKeeperPhoto; // Update only if new value is provided
    shop.description = req.body.description || shop.description; // Update only if new value is provided

    await shop.save();

    res.status(200).json({ message: "Shopkeeper details updated successfully", shop });
  } catch (error) {
    console.error("Error updating shopkeeper details:", error);
    res.status(500).json({ message: "Failed to update shopkeeper details", error });
  }
});


// Route to add a new shop
router.post("/add", async (req, res) => {
  try {
    const newFloorID = req.body.floorID; // Get floorID from the request body

    const newShop = new Shops({
      floorID: newFloorID, // Use provided floor ID
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

// Route to get a single shop by floorID
router.get("/get/:floorID", async (req, res) => {
  try {
    const { floorID } = req.params;
    const shop = await Shops.findOne({ floorID: floorID });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Failed to fetch shop", error });
  }
});

// Route to update a shop by floorID
router.put("/update/:floorID", async (req, res) => {
  try {
    const { floorID } = req.params;
    const updatedShop = await Shops.findOneAndUpdate(
      { floorID: floorID },
      req.body,
      { new: true }
    );
    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ message: "Shop updated successfully", updatedShop });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ message: "Failed to update shop", error });
  }
});

// Route to delete a shop by floorID
router.delete("/delete/:floorID", async (req, res) => {
  try {
    const { floorID } = req.params;
    const deletedShop = await Shops.findOneAndDelete({ floorID: floorID });
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
