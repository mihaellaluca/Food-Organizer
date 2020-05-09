const http = require("http");
const port = 3000;

const userService = require("./Services/UserService")();

async function requestListener(req, res) {
    if (req.method === "GET") {
        if (req.url.split("/")[1] === "users") {
            var data = await userService.getAllUsers();
            console.log("GET DATA:", data);
            res.writeHead(200);
            res.end(JSON.stringify(data));
        }
    }
}

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
