const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        }
    ],
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is not calculated'],
    },
    orderDate: {
        type: Date,
        default: Date.now,
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;