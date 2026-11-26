const mongoose = require('mongoose');

const bootSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    surface: { type: String, required: true },
    colour: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Boot', bootSchema, 'Boots');