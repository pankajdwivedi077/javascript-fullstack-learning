const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config()

const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connected = async () => {
    try{
      await mongoose.connect(uri);
      console.log("connected to db");
    }catch(e){
        console.log("Error in connecting to database");
        process.exit(1);
    }
}

module.exports = connected;