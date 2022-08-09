const multer = require('multer');
const multerS3 = require('multer-s3')
const path = require("path");
const AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");

// const UPLOADS_FOLDER = "./uploads"
const UPLOADS_FOLDER_PDF = "./uploads/pdf"
const UPLOADS_FOLDER_PHOTO = "./uploads/image"

//file Validator
var validDataFile = function (res, file, cb) {

    // console.log(file)
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
}


// define the the storage location
const storeFolder = (req, file, cb) => {
    const fileType = path.extname(file.originalname)
    // console.log(fileType)
    if (fileType == ".jpg" || fileType == ".jpeg" || fileType == ".png") {
        cb(null, UPLOADS_FOLDER_PHOTO);
    }
    else if (fileType == ".pdf") {
        cb(null, UPLOADS_FOLDER_PDF);
    }
}

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file);
        storeFolder(req, file, cb);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        // console.log(file);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + Date.now();
        // console.log(fileName);

        cb(null, fileName + fileExt);
    }
})



// AWS.config.update({
//     secretAccessKey: process.env.AWS_ACCESS_SECRETE,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// })

// var s3 = new AWS.S3();

const s3Config = new AWS.S3({
    accessKeyId: "6BZV6VVPXMHTKCPDV2AC",
    secretAccessKey: "eurc9+QfA8BJa7xjNBeSwr9AH8iBnuV/bqj4TlI4LgY",
    Bucket: "herosapp",
    endpoint: spacesEndpoint,
});

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: "herosapp",
    acl: "public-read",
    metadata: function (req, file, cb) {
        console.log(file)
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file);
        cb(null, "heroHQ/" + Date.now() + file.originalname)
    }
})





const handleFileUpload = (req, res, next) => {
    console.log(req.files);
    // const file = req.files;

    // let params = {
    //     Bucket: process.env.AWS_BUCKET,
    //     Key: req.files.originalname,
    //     Body: file
    // }

    // s3.upload(params, (err, result) => {
    //     if (err) {
    //         res.status(500).json({
    //             massage: "Failed to upload",
    //             error: err.message,
    //         })
    //     }
    //     res.status(201).json({
    //         massage: "Upload Successfully",
    //         result,
    //     })
    // })

    res.send("Upload Done");
};



module.exports = {
    storage,
    multerS3Config,
    validDataFile,
    handleFileUpload,
}