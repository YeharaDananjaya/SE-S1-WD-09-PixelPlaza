const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  colors: [String],
  sizes: [String],
  description: { type: String, required: true },
  manufacturedDate: { type: Date, required: false },
  category: [String],
  images: [String],
  stock: { type: Number, default: 0 }, 
  promotionApplied: { type: Boolean, default: false }, 
  promotionId: { type: String, default: "" },
  shopID: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;