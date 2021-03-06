const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    name: String,
    photoPath: String,
    category: String,
    description: String,
    ingredients: [],
    specific: String,
    price: Number,
    restrictions: String,
    restaurants: [],
    created_date: Date
});

module.exports = mongoose.model("Products", ProductSchema);
