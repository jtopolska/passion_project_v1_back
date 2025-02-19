const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    imageUrl: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model(`Reviews`, reviewsSchema)