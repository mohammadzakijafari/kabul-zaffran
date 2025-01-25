const mongoose = require('mongoose');

// importing dotenv package to get secret data from env file
require('dotenv').config();
const uri = process.env.MONGODB_URI;

// establishing connection to mongodb
main()
    .then(()=> console.log("DB connected successfully"))
    .then((error) => console.log(error));

async function main() {
    mongoose.connect(uri);
}

module.exports = main;