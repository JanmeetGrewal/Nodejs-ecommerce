const mongoose = require("mongoose");
const cartSchema = require("./cart");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  cart: {
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
        productCode: String

      }
    ],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0
    }
  },
  address: String,
  paymentId: String

});

module.exports = mongoose.model("Order", orderSchema);
