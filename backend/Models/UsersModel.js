const mongoose = require("mongoose");

var UsersSchema = new mongoose.Schema({
    admin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    created_date: Date
});

module.exports = mongoose.model('Users', UsersSchema);