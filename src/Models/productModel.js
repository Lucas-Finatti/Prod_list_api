const mongoose = require('mongoose');

const ProductModel = mongoose.model('Product', {
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = ProductModel