var Rss = require("rss");
var userRepo = require("./../Repositories/UserRepo")();

var feedOptions = {
    title: "Most Wanted",
    description: "The most popular products on KungFood page",
    feed_url: "",
    site_url: "",
};

var feed = new Rss(feedOptions);

module.exports = async function RssPopularity() {
    return {
        async getRssFeed() {
            //get top  most popular products and add them to feed
            var allUsers = await userRepo.getAllUsers();
            console.log(allUsers);

            var top = [];
            var statistic = [];

            allUsers.forEach((user) => {
                let userFavourites = user.favourites;
                userFavourites.forEach((food) => {
                    if (food in top) {
                        top[food]++;
                    } else {
                        top[food] = 1;
                    }
                });
            });
            for (let food in top) {
                statistic.push([food, top[food]]);
            }
            statistic.sort((a, b) => {
                return b[1] - a[1];
            });

            for (let i = 1; i <= 3; i++) {
                feed.item({
                    title: `Product ${i}: ${statistic[i]}`,
                    date: Date.now(),
                });
            }

            return (xml = feed.xml({indent: true}));
        },
    };
};
