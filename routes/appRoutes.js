const express = require("express");
const route = express.Router();
const appController = require("../controllers/fileUpload");

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

route.post("/upload", upload.single("File"), appController.handleFileUpload);

route.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)

    // apply filter
    // resize 

    const result = await appController.handleFileUpload
})


module.exports = route;
