const app = require("./index");
const http = require("http");

const server = http.createServer(app);

server.listen(3001, () => {
    console.log("server is running at port 3001");
});