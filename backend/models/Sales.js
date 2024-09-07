const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  shopID: {
    type: String,
    required: true,
    unique: true,
  },
  shopKeeperPhoto : {type: String, required: true},
  shopKeeperName: { type: String, required: true },
  shopName: { type: Number, required: true },
  Value: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
  customerName: { type: String, required: true },
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
