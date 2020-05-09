const http = require("http");
const port = 3000;
const requestListener = require("./Controllers/routers.js");

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
