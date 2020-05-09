const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    name: String,
    photoPath: String,
    description: String,
    ingredients: [{ ingredient: String, quantity: String }],
    specific: String,
    price: Number,
    restrictions: String,
    restaurants: [{ name: String }],
    created_date: Date
});

module.exports = mongoose.model("Products", ProductSchema);
