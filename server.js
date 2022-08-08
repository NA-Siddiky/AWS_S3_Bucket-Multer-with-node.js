const app = require("./index");
const http = require("http");

const server = http.createServer(app);

app.use((error, req, res, next) => {
    const message = `error --> "${error}"`
    console.log(message);
    return res.status(500).send(message);
})

server.listen(8080, () => {
    console.log("server is running at port 8080");
});

// const express = require('express')
// const multer = require('multer');

// const UPLOADS_FOLDER = "./uploads"

// const upload = multer({
//     dest: UPLOADS_FOLDER
// })

// const app = express()

// app.get("/", upload.single(), (req, res) => {
//     res.send("Hello");
// })

// app.post("/upload", upload.single("avatar"), (req, res) => {
//     res.send("Hello");
// })

// app.listen(8080, () => {
//     console.log("listening on port 8080")
// })