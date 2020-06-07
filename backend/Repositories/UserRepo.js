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
        async getUserByEmail(email) {
            var user = UsersModel.findOne({ email: email });
            return user;
        },
        async addUser(user) {
            return UsersModel.collection.insertOne(user, (err, docs) => {
                if (err) {
                    console.log(err);
                }
            });
        },
        async addToFavourites(userId, product) {
            console.log(userId);
            var user = await UsersModel.findById(userId);
            for (let i = 0; i < user.favourites.length; i++) {
                console.log("fav:", user.favourites[i]);
                if (user.favourites[i]._id === product._id) {
                    console.log("cant add same element");
                    return null;
                }
            }
            var newFavourites = user.favourites.push(product);
            console.log("newFavou", newFavourites);
            user.updateOne({ favourites: newFavourites });
            console.log("updated");
            return user.save();
        },
        async getUserFavourites(userId) {
            console.log(userId);
            var favourites = await UsersModel.find(
                { _id: userId },
                "favourites",
                (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
            console.log("Favourites", favourites);
            return favourites;
        },
    };
};
