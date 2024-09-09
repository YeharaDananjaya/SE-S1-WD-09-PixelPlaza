const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({

  floorID: { 
    type: String, 
    unique: true,
    required: true,
  },
  shopKeeperPhoto: { 
    type: String
  },
  shopKeeperName: { 
    type: String
  },
  shopName: { 
    type: String
  },
  assignDate: { 
    type: Date
  },
  Value: { 
    type: Number 
  },
  description: { 
    type: String 
  },
});

const Shops = mongoose.model("ShopCompartments", shopSchema);

module.exports = Shops;