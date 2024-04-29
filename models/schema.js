const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: { type:String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    company: {type: String, required: true}
});

module.exports = mongoose.model('product-details', productSchema);