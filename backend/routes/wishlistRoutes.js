const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Add item to wishlist
router.post('/', async (req, res) => {
  const { productId } = req.body;

  try {
    // Check if the product is already in the wishlist
    const existingWishlistItem = await Wishlist.findOne({ productId });
    
    if (existingWishlistItem) {
      return res.status(400).json({ message: 'Product is already in wishlist' });
    }

    const wishlistItem = new Wishlist({ productId });
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product to wishlist', error: err });
  }
});

// Get all wishlist items
router.get('/wishlist', async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find().populate('productId');
    res.status(200).json(wishlistItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error: err });
  }
});

// Remove item from wishlist
router.delete('/wishlist/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item from wishlist', error: err });
  }
});

module.exports = router;
