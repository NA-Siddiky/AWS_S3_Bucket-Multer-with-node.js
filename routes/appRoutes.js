const express = require("express");
const route = express.Router();
const appController = require("../controllers/fileUpload");

const multer = require('multer')

const UPLOADS_FOLDER = "./uploads"

const upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 10000000 //1 MB
    },
    fileFilter: (req, file, cb) => {
        console.log(file)
        if (file.fieldname === 'photo') {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                cb(new Error(`file formate is not supported >> ${Error}`));
            }
        }
        else if (file.fieldname === 'doc') {
            if (
                file.mimetype === "application/pdf"
            ) {
                cb(null, true);
            } else {
                cb(new Error(`file formate is not supported >> ${Error}`));
            }
        }
        else {
            cb(new Error(`There was an unknown error >> ${Error}`));
        }
    },

})


route.post("/upload", upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "doc", maxCount: 1 },
]), appController.handleFileUpload);


module.exports = route;
