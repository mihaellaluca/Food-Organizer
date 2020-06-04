const userService = require("../Services/UserService")();
const productService = require("../Services/ProductService")();
const rssService = require("./../Services/RSS")();
const url = require("url");

module.exports = async function requestListener(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    ///// GET
    if (req.method === "GET") {
        const queryParam = url.parse(req.url, true).query;
        var key = Object.keys(queryParam)[0];

        /////////////////////// USERS ////////////////////////////////

        if (key === "users") {
            // http://localhost:3000/?users
            var data = await userService.getAllUsers();
            res.write(JSON.stringify(data));
        }
        if (key === "users/id") {
            // http://localhost:3000/?users/id=123456
            var data = await userService.getById(queryParam[key]);
            res.writeHead(data.statusCode);
            res.write(JSON.stringify(data));
            res.end();
        }

        /////////////////////// PRODUCTS ////////////////////////////

        if (key === "products") {
            // http://localhost:3000/?products
            var data = await productService.getAllProducts();
            console.log(data);
            res.writeHead(data.statusCode);
            res.write(JSON.stringify(data));
            res.end();
        }

        if (key === "products/id") {
            // http://localhost:3000/?products/id=123
            var data = await productService.getProductById(queryParam[key]);
            res.writeHead(data.statusCode);
            res.write(JSON.stringify(data));
            res.end();
        }

        if (key === "products/category") {
            // http://localhost:3000/?products/category=salad
            var data = await productService.getProductsByCategory(
                queryParam[key]
            );
            res.writeHead(data.statusCode);
            res.write(JSON.stringify(data));
            res.end();
        }
         
        if(key === "rss") {
            var data = rssService.getRssFeed();
        }
    }

    ///// POST
    if (req.method === "POST") {
        let body = "";
        var route = req.url.split("/")[1];
        req.on("data", async (chunk) => {
            body += chunk.toString(); // convert chunk Buffer to string
            body = JSON.parse(body); // convert string to json

            //////// USERS /////////
            if (route === "login") {
                let request = {
                    email: body.email,
                    password: body.password,
                };
                var data = await userService.login(request);
                res.writeHead(data.statusCode);
                res.write(JSON.stringify(data));
                res.end();
            }
            if (route === "register") {
                let request = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password,
                    favourites: [],
                };
                var data = await userService.register(request);
                res.writeHead(data.statusCode);
                res.write(JSON.stringify(data));
                res.end();
            }

            if (route === "addUser") {
                // http://localhost:3000/addUser
                var user = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password,
                    favourites: body.favourites,
                };
                var data = await userService.addUser(user);
                res.writeHead(data.statusCode);
                res.write(JSON.stringify(data));
                res.end();
            }

            if (route === "addFavourite") {
                var data = await userService.addToFavourites(
                    body.userId,
                    body.product
                );
                res.writeHead(data.statusCode);
                res.write(JSON.stringify(data));
                res.end();
            }

            ///////// PRODUCTS //////////

            if (route == "addProduct") {
                // http://localhost:3000/addProduct
                var product = {
                    name: body.name,
                    photoPath: body.photoPath,
                    category: body.category,
                    description: body.description,
                    ingredients: body.ingredients,
                    specific: body.specific,
                    price: body.price,
                    restrictions: body.restrictions,
                    restaurants: body.restaurants,
                };
                var data = await productService.addProduct(product);
                res.writeHead(data.statusCode);
                res.write(JSON.stringify(data));
                res.end();
            }
        });
    }

};
