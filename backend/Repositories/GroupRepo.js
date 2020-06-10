var GroupModel = require("./../Models/GroupModel");

module.exports = function usersAccess() {
    return {
        async getGroupById(groupId) {
            return GroupModel.findById(groupId);
        },
        async getAllGroups() {
            return GroupModel.find();
        },
        async addGroup(group) {
            return GroupModel.collection.insertOne(group);
        },
        async postToGroup(productId, productName, productPhoto, groupId) {
            console.log(productId, productName, productPhoto, groupId);
            var group = await GroupModel.findById(groupId);
            for (let i = 0; i < group.productsId.length; i++) {
                console.log("prod[i]:", group.productsId[i]); // obiect
                if (productId === group.productsId[i]._id) {
                    console.log("cant add same element");
                    return null;
                }
            }
            var newProducts = group.productsId.push({
                _id: productId,
                name: productName,
                photoPath: productPhoto,
            });
            group.updateOne({
                productsId: newProducts,
            });
            console.log("updated");
            return group.save();
        },
        async checkUserInAGroup(userId) {
            console.log(userId);
            var x = "";
            var groups = await this.getAllGroups();
            for (let i = 0; i < groups.length; i++) {
                groups[i].membersId.forEach((memberId) => {
                    if (memberId === userId) {
                        console.log("group._id", groups[i]._id);
                        x = groups[i]._id;
                    }
                });
            }
            if (x === "") return null;
            else return x;
        },
    };
};
