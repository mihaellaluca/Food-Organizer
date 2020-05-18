const mongoose = require("mongoose");

var UsersSchema = new mongoose.Schema({
    admin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    favourites: [],
    created_date: Date
});

module.exports = mongoose.model('Users', UsersSchema);