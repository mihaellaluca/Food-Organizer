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
        async login(request) {
            try {
                var user = await repo.getUserByEmail(request.email);
                if (user) {
                    if (request.password === user.password) {
                        return {
                            statusCode: 200,
                            data: user,
                        };
                    }
                } else
                    return {
                        statusCode: 400,
                        data: { msg: "Wrong email or password." },
                    };
            } catch (err) {
                return {
                    statusCode: 400,
                    data: { msg: err },
                };
            }
        },
        async register(request) {
            try {
                var user = await repo.getUserByEmail(request.email);
                if (user) {
                    return {
                        statusCode: 400,
                        data: { msg: "Email already in use." },
                    };
                } else {
                    var registeredUser = await this.addUser(request);
                    return {
                        statusCode: 200,
                        data: registeredUser.data,
                    };
                }
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: { msg: err },
                };
            }
        },
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
                    favourites: newUser.favourites,
                    created_date: Date.now(),
                });
                var inserted = await repo.addUser(user);
                console.log(inserted);
                return {
                    statusCode: 200,
                    data: { msg: "User inserted" },
                };
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async addToFavourites(userId, product) {
            try {
                var updated = await repo.addToFavourites(userId, product);
                console.log(updated);
                return {
                    statusCode: 200,
                    data: { msg: "Product added to favourites." },
                };
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async getUserFavourites(userId) {
            try {
                var favourites = await repo.getUserFavourites(userId);
                if (favourites == null) {
                    return {
                        statusCode: 404,
                        data: { msg: "No favourites" },
                    };
                } else {
                    return {
                        statusCode: 200,
                        data: favourites,
                    };
                }
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: { msg: err },
                };
            }
        },
    };
};
