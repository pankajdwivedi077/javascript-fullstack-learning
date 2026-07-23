const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config()

const mongoose = require("mongoose");
const logger = require("../utils/logger");

const uri = process.env.MONGO_URI;

const connected = async() => {
    try{
        await mongoose.connect(uri);
        logger.info("db connected");
        console.log("db connected successfully");
    }catch(e){
        logger.warn("mongodb connection failed");
        console.log("mongodb connection failed!");
        process.exit(1);
    }
}

module.exports = connected;