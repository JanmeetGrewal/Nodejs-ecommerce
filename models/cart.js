const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 0
      },
      price: {
        type: Number,
        default: 0,
      },
      name: {
        type: String,
      },
      imagePath:String,
      productCode: String

    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Cart", cartSchema);
