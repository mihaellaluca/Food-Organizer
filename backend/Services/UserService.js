var repo = require("./../Repositories/UserRepo.js")();
var UsersModel = require("./../Models/UsersModel");
const mongoose = require("mongoose");

module.exports = function userService() {
    mongoose.connect(
        "mongodb+srv://Animals:animals@cluster-fwa4q.mongodb.net/Kungfood?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (!err) console.log("Succesfully connected to database.");
            else console.log("Error connecting to database");
        }
    );
    return {
        async getAllUsers() {
            var users = await repo.getAllUsers();
            return users;
        },
        async getById(userId) {
            try {
                var user = await repo.getUserById(userId);
                if (user == null) {
                    return {
                        statusCode: 404,
                        data: { msg: "User not found" },
                    };
                } else
                    return {
                        statusCode: 200,
                        data: user,
                    };
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async addUser(newUser) {
            try {
                let user = new UsersModel({
                    admin: false,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    password: newUser.password,
                    created_date: Date.now(),
                });
                var inserted = await repo.addUser(user);
                return {
                    statusCode: 200,
                    data: { msg: "User inserted" },
                };
            } catch (err) {
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
    };
};
