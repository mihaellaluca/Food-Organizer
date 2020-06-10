const mongoose = require("mongoose");

var GroupSchema = new mongoose.Schema({
    name: String,
    membersId: [],
    productsId: [],
    created_date: Date
});

module.exports = mongoose.model('Group', GroupSchema);