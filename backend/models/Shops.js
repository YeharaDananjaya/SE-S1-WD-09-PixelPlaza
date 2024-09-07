const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopID: {
    type: String,
    required: true,
    unique: true,
  },
  floorID : {type: String, required: true},
  shopKeeperPhoto : {type: String, required: true},
  shopKeeperName: { type: String, required: true },
  shopName: { type: String, required: true }, // Changed to String for shop names
  assignDate : {type: Date, required: true},
  Value: { type: Number, required: true },
  description: { type: String, required: true },
});

const Shops = mongoose.model("Shops", shopSchema);

module.exports = Shops;
