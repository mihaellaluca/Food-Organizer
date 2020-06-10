var repo = require("./../Repositories/GroupRepo.js")();
var GroupModel = require("./../Models/GroupModel");
const mongoose = require("mongoose");

module.exports = function groupService() {
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
        async getGroupById(groupId) {
            var group = await repo.getGroupById(groupId);
            return group;
        },
        async getAllGroups() {
            var groups = await repo.getAllGroups();
            return groups;
        },
        async addGroup(request) {
            try {
                var group = new GroupModel({
                    name: request.name,
                    membersId: request.membersId,
                    productsId: request.productsId,
                    created_date: Date.now(),
                });

                var data = await repo.addGroup(group);
                return {
                    statusCode: 200,
                    data: { msg: "Group inserted." },
                };
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async postToGroup(productId, productName, productPhoto,groupId) {
            try {
                var updated = await repo.postToGroup(productId, productName, productPhoto,groupId);
                console.log("up:", updated);
                if (updated === null) {
                    return {
                        statusCode: 400,
                        data: { msg: "Product already exists in group." },
                    };
                }
                return {
                    statusCode: 200,
                    data: { msg: "Product added to group." },
                };
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async checkUserInAGroup(userId) {
            try {
                let groupId = await repo.checkUserInAGroup(userId);
                console.log("groupId:",groupId);
                if (groupId === null) {
                    return {
                        statusCode: 400,
                        data: { msg: "No group." },
                    };
                } else {
                    return {
                        statusCode: 200,
                        data: groupId,
                    };
                }
            } catch (err) {
                return {
                    statusCode: 400,
                    data: { msg: "Bad request" },
                };
            }
        },
    };
};
