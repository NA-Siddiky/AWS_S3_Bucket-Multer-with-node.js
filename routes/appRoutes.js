const express = require("express");
const route = express.Router();
const multer = require('multer');
const path = require("path");

const appController = require("../controllers/fileUpload");

// const UPLOADS_FOLDER = "./uploads"
const UPLOADS_FOLDER_PDF = "./uploads/pdf"
const UPLOADS_FOLDER_PHOTO = "./uploads/image"

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileType = path.extname(file.originalname)
        console.log(fileType)
        if (fileType == ".jpg" || fileType == ".jpeg" || fileType == ".png") {
            cb(null, UPLOADS_FOLDER_PHOTO);
        }
        else if (fileType == ".pdf") {
            cb(null, UPLOADS_FOLDER_PDF);
        }


    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        // console.log(fileExt);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + Date.now();
        // console.log(fileName);

        cb(null, fileName + fileExt);
    }
})


// prepare the file
const upload = multer({
    // dest: UPLOADS_FOLDER,
    storage: storage,
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
