const express = require("express");
const route = express.Router();
const appController = require("../controllers/fileUpload");

const multer = require('multer')

const UPLOADS_FOLDER = "./uploads"

const upload = multer({
    dest: UPLOADS_FOLDER
})


route.post("/upload", upload.single("photo"), appController.handleFileUpload);


module.exports = route;
