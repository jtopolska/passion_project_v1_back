const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageUrl: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model(`Posts`, postSchema)