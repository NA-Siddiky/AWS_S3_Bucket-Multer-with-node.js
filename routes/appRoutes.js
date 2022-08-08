const express = require("express");
const route = express.Router();
const appController = require("../controllers/fileUpload");

const multer = require('multer')

const UPLOADS_FOLDER = "./uploads"

const upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 5000000 //1 MB
    },
    fileFilter: (req, file, cb) => {
        console.log(file)
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error(`file formate is not supported >> ${Error}`));
        }
    },

})


route.post("/upload", upload.single("photo"), appController.handleFileUpload);


module.exports = route;
