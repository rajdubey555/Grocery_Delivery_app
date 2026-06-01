const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    image: String,
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [orderItemSchema],
        shippingAddress: {
            name: { type: String, required: true },
            mobile: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['cod', 'upi', 'credit', 'debit'],
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        deliveryCharge: {
            type: Number,
            required: true,
            default: 40,
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);