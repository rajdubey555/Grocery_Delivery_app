const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required'],
        },
        description: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: 0,
            default: 0,
        },
        image: {
            type: String,
            default: '',
        },
        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);