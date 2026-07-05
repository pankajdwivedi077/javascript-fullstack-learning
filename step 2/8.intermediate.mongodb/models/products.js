const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    inStock: Boolean,
    tags: [String]
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);