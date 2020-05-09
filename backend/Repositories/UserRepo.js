var UsersModel = require("./../Models/UsersModel");

module.exports = function usersAccess() {
    return {
        async getAllUsers() {
            var allUsers = UsersModel.find();
            return allUsers;
        },
        async getUserById(userId) {
            var user = UsersModel.findById(userId);
            return user;
        },
        async addUser(user) {
            return UsersModel.collection.insertOne(user, (err, docs) => {
                if (err) {
                    console.log(err);
                }
            });
        },
    };
};
