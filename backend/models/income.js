const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: false,
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  salesDetails: [
    {
      itemId: { type: String },
      quantity: { type: Number },
      totalSales: { type: Number },
    },
  ],
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
