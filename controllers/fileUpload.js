const AWS = require("aws-sdk");

AWS.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRETE,


})


const handleFileUpload = (req, res, next) => {
    // console.log("request body", req.files);
    res.send("Upload Done");
};

module.exports = {
    handleFileUpload,
}