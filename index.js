const express = require("express");
const app = express();
const appRoute = require("./routes/appRoutes");
require("dotenv").config();

app.use("/api", appRoute);
module.exports = app;
