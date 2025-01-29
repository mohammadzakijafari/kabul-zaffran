const express = require("express");
const db = require("./config/connection");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require('./config/cloudinary');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", require("./routers/user"));
app.use("/", require("./routers/product"));

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});