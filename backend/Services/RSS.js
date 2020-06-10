var Rss = require("rss");
var userRepo = require("./../Repositories/UserRepo")();

var feedOptions = {
    title: "Most Wanted",
    description: "The most popular products on KungFood page",
    feed_url: "http://localhost:3000/rss",
    site_url: "",
};

var feed = new Rss(feedOptions);

module.exports = async function RssPopularity() {
    return {
        async getRssFeed() {
            console.log("getting rss");
            //get top  most popular products and add them to feed
            var allUsers = await userRepo.getAllUsers();
            console.log("all users:", allUsers);

            var top = [];
            var statistic = [];

            allUsers.forEach((user) => {
                console.log("rss user:", user);
                let userFavourites = user.favourites;
                console.log("fav", userFavourites);
                userFavourites.forEach((product) => {
                    console.log("food", product.name);
                    if (product.name in top) {
                        top[product.name]++;
                    } else {
                        top[product.name] = 1;
                    }
                });
            });
            for (let productName in top) {
                statistic.push([productName, top[productName]]);
            }
            statistic.sort((a, b) => {
                return b[1] - a[1];
            });
            console.log("statistic", statistic);

            for (let i = 1; i <= 3; i++) {
                // TOP 3 PRODUCTS
                feed.item({
                    title: ` Product ${i}: ${statistic[i]} `,
                    date: Date.now(),
                });
            }
            console.log("feedy", feed);
            return feed.xml({ indent: true });
        },

        async getStatistics() {
            let allUsers = await userRepo.getAllUsers();
            let nrOfUsers = (await allUsers).length;
            let nrOfUsersInLastDays = 0;
            allUsers.forEach((user) => {
                let date1 = new Date(user.created_date);
                let today = Date.now();
                let date2 = new Date(today);
                var diffDays = date2.getDate() - date1.getDate();
                if (diffDays <= 10) {
                    nrOfUsersInLastDays++;
                }
            });

            return {
                nrOfUsers: nrOfUsers,
                nrOfUsersInLastDays: nrOfUsersInLastDays,
            };
        },
    };
};
