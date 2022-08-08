const handleFileUpload = (req, res, next) => {
    console.log("request body", req.files);
    res.send("Upload Done");
};

module.exports = {
    handleFileUpload,
}