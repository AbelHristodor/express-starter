const mongoose = require('mongoose');

// Defining Mongoose Schema
const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    resolution: Array,
    thumbnail: {
        type: String,
        required: true
    },
});

// Defining Mongoose Model
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
