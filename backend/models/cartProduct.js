const mongoose = require("mongoose");

const cartproductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  color:{ type: String, required: true },
  sizes: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
});

const cartProduct = mongoose.model("cartProduct", cartproductSchema);

module.exports = cartProduct; 