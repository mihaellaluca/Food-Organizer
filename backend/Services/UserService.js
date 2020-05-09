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
            console.log(users);
            return users;
        },
        async getById(userId) {
            var user = await repo.getAllUsers(userId);
            return user;
        },
        async addUser(newUser) {
            let user = new UsersModel({
                admin: false,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                created_date: Date.now(),
            });
            var inserted = await repo.addUser(user);
            return inserted;
        },
        
        
    };
};
