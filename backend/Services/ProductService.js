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
                if (products) {
                    return {
                        statusCode: 200,
                        data: products,
                    };
                } else
                    return {
                        statusCode: 404,
                        data: { msg: "No products found." },
                    };
            } catch (err) {
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async getProductById(productId) {
            try {
                var product = await repo.getProductById(productId);
                if (product) {
                    return {
                        statusCode: 200,
                        data: product,
                    };
                } else
                    return {
                        statusCode: 404,
                        data: { msg: "Product not found." },
                    };
            } catch (err) {
                return {
                    statusCode: 400,
                    data: err,
                };
            }
        },
        async addProduct(newProduct) {
            try {
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
                return {
                    statusCode: 200,
                    data: { msg: "Product inserted." },
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
