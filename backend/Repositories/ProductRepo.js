var ProductModel = require("./../Models/ProductModel");

module.exports = function productsAccess() {
    return {
        async getAllProducts() {
            return ProductModel.find();
        },
        async getProductById(productId) {
            return ProductModel.findById(productId);
        },
        async addProduct(product) {
            return ProductModel.collection.insertOne(product);
        },
        async getProductsByCategory(category) {
            return ProductModel.find({category: category});
        }
    }
}