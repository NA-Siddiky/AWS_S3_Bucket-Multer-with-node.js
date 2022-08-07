const express = require("express");
const route = express.Router();
const appController = require("../controllers/fileUpload");

route.post("/upload", appController.handleFileUpload);

module.exports = route;
