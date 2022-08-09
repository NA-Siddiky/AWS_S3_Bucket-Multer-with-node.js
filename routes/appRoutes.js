const express = require("express");
const route = express.Router();
const multer = require('multer');

const appController = require("../controllers/fileUpload");


// prepare the file
const upload = multer({
    // dest: UPLOADS_FOLDER,
    storage: appController.multerS3Config,
    fileFilter: function (res, file, cb) {
        appController.validDataFile(res, file, cb)
    },
    limits: {
        fileSize: 10000000 //1 MB
    },


})


route.post("/upload", upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "doc", maxCount: 1 },
]), appController.handleFileUpload);

// route.post("/upload/img", upload.fields([
//     { name: "photo", maxCount: 1 },
//     { name: "doc", maxCount: 1 },
// ]), appController.handleFileUpload);


module.exports = route;
