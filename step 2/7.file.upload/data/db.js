const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectToDB = async() => {
    try{
        await mongoose.connect(uri);
        console.log('MongoDb connected successfully');
    }catch(e){
        console.error('MongoDb connection failed');
        process.exit(1);
    }
}

module.exports = connectToDB;