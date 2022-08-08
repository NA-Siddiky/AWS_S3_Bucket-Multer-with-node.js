const handleFileUpload = (req, res, next) => {
    // console.log("request body", req.body, req.file);
    res.send("Upload Done");
};

module.exports = {
    handleFileUpload,
}