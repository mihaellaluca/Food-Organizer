var repo = require("./../Repositories/ProductRepo.js")();
var ProductModel = require("./../Models/ProductModel");
const mongoose = require("mongoose");

module.exports = function productService() {
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
        async getAllProducts() {
            try {
                var products = await repo.getAllProducts();
                console.log(products);
                return {
                    data: products,
                    statusCode: 200,
                };
            } catch (err) {
                return {
                    error: err,
                    statusCode: 400,
                };
            }
        },
        async getProductById(productId) {
            var product = await repo.getProductById(productId);
            return product;
        },
        async addProduct(newProduct) {
            var product = new ProductModel({
                name: newProduct.name,
                description: newProduct.description,
                ingredients: newProduct.ingredients,
                specific: newProduct.specific,
                price: newProduct.price,
                restrictions: newProduct.restrictions,
                restaurants: newProduct.restaurants,
                created_date: Date.now(),
            });
            var inserted = await repo.addProduct(product);
            console.log("am incercat");
            return inserted;
        },
    };
};
